#!/usr/bin/env node

/**
 * Productive.io MCP Server
 * Main entry point for the Model Context Protocol server
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getConfig } from "./config/index.js";
import { registerTools } from "./tools/index.js";

async function main(): Promise<void> {
  try {
    // Load configuration
    const config = getConfig();

    // Create MCP server instance
    const server = new McpServer({
      name: config.server.name,
      version: config.server.version,
      capabilities: {
        resources: {},
        tools: {},
      },
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