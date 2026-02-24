/**
 * Tool Registry
 * Aggregates tools from all group barrel files
 */

import { Tool } from "../types/tool.types.js";
import { taskTools } from "./tasks/index.js";

/**
 * Get all available tools from all groups
 * Add new tool group imports here to automatically register them
 */
export function getAllTools(): Tool[] {
  return [
    ...taskTools,
  ];
}

/**
 * Register all tools with the MCP server
 */
export function registerTools(
  server: unknown,
  tools: Tool[] = getAllTools()
): void {
  for (const tool of tools) {
    const definition = tool.getDefinition();

    // Extract the shape from zod schema - handle both ZodObject and other types
    const schemaShape = 'shape' in definition.schema
      ? (definition.schema as Record<string, unknown>).shape
      : {};

    (server as Record<string, Function>).tool(
      definition.name,
      definition.description,
      schemaShape,
      async (input: unknown) => {
        return await tool.execute(input);
      }
    );
  }
}
