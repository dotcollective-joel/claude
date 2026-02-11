#!/usr/bin/env node

/**
 * Weather MCP Server
 * Main entry point for the Model Context Protocol server
 */

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getConfig } from "./config/index.js";
import { registerTools } from "./tools/index.js";

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../.env") });

async function main(): Promise<void> {
  try {
    // Load configuration
    const config = getConfig();

    // Create MCP server instance
    const server = new McpServer({
      name: config.server.name,
      version: config.server.version,
    });

    // Auto-register all tools
    registerTools(server);

    // Connect to stdio transport
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error(
      `${config.server.name} MCP Server v${config.server.version} running on stdio`
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
