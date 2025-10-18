# Productive.io MCP Server

A Model Context Protocol (MCP) server for interacting with Productive.io task management platform.

## Features

- 🔧 **Extensible Architecture** - Plugin-based tool system for easy extension
- 📦 **Modular Design** - Clean separation of concerns with TypeScript
- 🔒 **Type-Safe** - Full TypeScript support with strict type checking
- ⚙️ **Configuration Management** - Environment-based configuration
- 🎯 **Easy to Extend** - Add new tools by creating a single class

## Installation

```bash
# Install dependencies
pnpm install

# Build the project
npm run build
```

## Configuration

### For Claude Desktop

Add the MCP server to your Claude Desktop config file with environment variables:

**Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "productive.io": {
      "command": "node",
      "args": ["/Users/joelkrause/dev/productive-mcp/build/index.js"],
      "env": {
        "PRODUCTIVE_API_TOKEN": "your-api-token-here",
        "PRODUCTIVE_ORGANIZATION_ID": "your-organization-id",
        "PRODUCTIVE_USER_ID": "your-user-id"
      }
    }
  }
}
```

### For Development/Testing

You can also use a `.env` file (use `.env.example` as a template):

```bash
cp .env.example .env
```

Required environment variables:
- `PRODUCTIVE_API_TOKEN` - Your Productive.io API token
- `PRODUCTIVE_ORGANIZATION_ID` - Your organization ID
- `PRODUCTIVE_USER_ID` - Your user ID

## Available Tools

### get_task
Get a single task from Productive.io by URL.

**Parameters:**
- `url` (string) - Productive.io task URL

### get_tasks
Get multiple tasks with optional filters.

**Parameters:**
- `assignee_id` (string, optional) - Filter by assignee ID
- `status` (number, optional) - Filter by status (1=Open, 2=Closed)
- `project_id` (string, optional) - Filter by project ID

## Project Structure

```
src/
├── config/           # Configuration management
│   └── index.ts      # Environment-based config loader
├── services/         # API clients and services
│   └── ProductiveApiClient.ts  # Typed Productive.io API client
├── tools/           # MCP tools (plugins)
│   ├── base/        # Base tool class
│   │   └── BaseTool.ts
│   ├── get-task/    # Individual tool modules
│   │   ├── index.ts    # Tool implementation
│   │   ├── handler.ts  # Business logic (includes URL extraction)
│   │   └── schema.ts   # Zod validation schema
│   ├── get-tasks/
│   │   ├── index.ts
│   │   ├── handler.ts
│   │   └── schema.ts
│   └── index.ts     # Tool registry and auto-registration
├── types/           # TypeScript type definitions
│   ├── config.types.ts
│   ├── productive.types.ts
│   └── tool.types.ts
└── index.ts         # Main entry point
```

## Adding a New Tool

Adding a new tool is simple with the extensible architecture:

### 1. Create a new tool directory

```bash
mkdir -p src/tools/your-tool
```

### 2. Create the schema (`src/tools/your-tool/schema.ts`)

```typescript
import { z } from "zod";

export const YourToolSchema = z.object({
  param1: z.string().describe("Description of param1"),
  param2: z.number().optional().describe("Optional param2"),
});

export type YourToolInput = z.infer<typeof YourToolSchema>;
```

### 3. Create the handler (`src/tools/your-tool/handler.ts`)

```typescript
import { ProductiveApiClient } from "../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../types/tool.types.js";

export async function handleYourTool(
  input: YourToolInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    // Your logic here
    const result = await apiClient.someMethod();

    return {
      content: [{ type: "text", text: "Success!" }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : "Unknown"}`,
        },
      ],
      isError: true,
    };
  }
}
```

### 4. Create the tool class (`src/tools/your-tool/index.ts`)

```typescript
import { BaseTool } from "../base/BaseTool.js";
import { ProductiveApiClient } from "../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../types/tool.types.js";
import { YourToolSchema, YourToolInput } from "./schema.js";
import { handleYourTool } from "./handler.js";

export class YourTool extends BaseTool<YourToolInput> {
  readonly name = "your_tool";
  readonly description = "Description of what your tool does";
  readonly schema = YourToolSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: YourToolInput): Promise<ToolResponse> {
    return handleYourTool(input, this.apiClient);
  }
}
```

### 5. Register the tool (`src/tools/index.ts`)

```typescript
import { YourTool } from "./your-tool/index.js";

export function getAllTools(): Tool[] {
  return [
    new GetTaskTool(),
    new GetTasksTool(),
    new YourTool(), // Add your tool here
  ];
}
```

That's it! Your new tool will be automatically registered and available.

## Development

```bash
# Build the project
npm run build

# Watch mode for development
npm run dev

# Type checking only
npm run typecheck

# Clean build directory
npm run clean

# Clean and rebuild
npm run rebuild
```

## Architecture Benefits

### Extensibility
- **Plugin-based**: New tools are self-contained modules
- **Auto-registration**: Tools are automatically registered from the registry
- **No core changes**: Adding tools doesn't require modifying the main server code

### Type Safety
- **Full TypeScript**: Strict type checking enabled
- **Type inference**: Zod schemas provide runtime validation and compile-time types
- **API types**: Fully typed Productive.io API responses

### Maintainability
- **Separation of concerns**: Each tool has its own directory with schema, handler, and implementation
- **Reusable components**: BaseTool provides common functionality
- **Clear structure**: Easy to navigate and understand

### Best Practices
- **Error handling**: Consistent error responses across all tools
- **Configuration**: Environment-based configuration management
- **Documentation**: JSDoc comments throughout the codebase

## License

MIT
