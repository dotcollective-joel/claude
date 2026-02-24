/**
 * Shared Report Schema
 * Base Zod schema for all report tools — provides common filter fields
 */

import { z } from "zod";

export const BaseReportSchema = z.object({
  group: z.string().optional().describe("Grouping strategy (e.g., 'person', 'project', 'company', 'service', 'created_at:month', 'created_at:week'). Supports multi-grouping with comma-separated values."),
  after: z.string().optional().describe("Filter report data after this date (YYYY-MM-DD)"),
  before: z.string().optional().describe("Filter report data before this date (YYYY-MM-DD)"),
  company_id: z.string().optional().describe("Filter by company ID"),
  project_id: z.string().optional().describe("Filter by project ID"),
  person_id: z.string().optional().describe("Filter by person ID"),
  deal_id: z.string().optional().describe("Filter by deal/budget ID"),
  service_id: z.string().optional().describe("Filter by service ID"),
});

export type BaseReportInput = z.infer<typeof BaseReportSchema>;
