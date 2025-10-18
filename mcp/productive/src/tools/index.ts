/**
 * Tool Registry
 * Auto-exports all available tools
 */

import { Tool } from "../types/tool.types.js";
import { GetTaskTool } from "./get-task/index.js";
import { GetTasksTool } from "./get-tasks/index.js";

/**
 * Get all available tools
 * Add new tools to this array to automatically register them
 */
export function getAllTools(): Tool[] {
  return [new GetTaskTool(), new GetTasksTool()];
}

/**
 * Register all tools with the MCP server
 */
export function registerTools(
  server: any,
  tools: Tool[] = getAllTools()
): void {
  for (const tool of tools) {
    const definition = tool.getDefinition();

    // Extract the shape from zod schema - handle both ZodObject and other types
    const schemaShape = 'shape' in definition.schema
      ? (definition.schema as any).shape
      : {};

    server.tool(
      definition.name,
      definition.description,
      schemaShape,
      async (input: any) => {
        return await tool.execute(input);
      }
    );
  }
}
