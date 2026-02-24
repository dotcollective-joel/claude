/**
 * Tool Registry
 * Aggregates tools from all group barrel files
 */

import { Tool } from "../types/tool.types.js";
import { taskTools } from "./tasks/index.js";
import { projectTools } from "./projects/index.js";
import { boardTools } from "./boards/index.js";
import { peopleTools } from "./people/index.js";
import { companyTools } from "./companies/index.js";
import { activityTools } from "./activities/index.js";
import { timeEntryTools } from "./time-entries/index.js";
import { bookingTools } from "./bookings/index.js";
import { dealTools } from "./deals/index.js";
import { invoiceTools } from "./invoices/index.js";
import { serviceTools } from "./services/index.js";
import { expenseTools } from "./expenses/index.js";
import { reportTools } from "./reports/index.js";
import { teamTools } from "./teams/index.js";
import { workflowTools } from "./workflows/index.js";
import { customFieldTools } from "./custom-fields/index.js";
import { serviceTypeTools } from "./service-types/index.js";
import { dashboardTools } from "./dashboards/index.js";
import { notificationTools } from "./notifications/index.js";

/**
 * Get all available tools from all groups
 * Add new tool group imports here to automatically register them
 */
export function getAllTools(): Tool[] {
  return [
    ...taskTools,
    ...projectTools,
    ...boardTools,
    ...peopleTools,
    ...companyTools,
    ...activityTools,
    ...timeEntryTools,
    ...bookingTools,
    ...dealTools,
    ...invoiceTools,
    ...serviceTools,
    ...expenseTools,
    ...reportTools,
    ...teamTools,
    ...workflowTools,
    ...customFieldTools,
    ...serviceTypeTools,
    ...dashboardTools,
    ...notificationTools,
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
