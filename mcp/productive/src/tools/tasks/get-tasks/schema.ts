/**
 * Get Tasks Tool Schema
 */

import { z } from "zod";

export const GetTasksSchema = z.object({
  assignee_id: z.string().optional().describe("Filter by assignee ID"),
  status: z.number().optional().describe("Filter by status (1=Open, 2=Closed)"),
  project_id: z.string().optional().describe("Filter by project ID"),
  format: z.enum(['text', 'json']).optional().describe("Output format: 'text' for human-readable format, 'json' for structured data (default: text)"),
  only_due_today_or_overdue: z.boolean().optional().describe("If true, only return tasks that are due today or overdue (client-side filtering)"),
});

export type GetTasksInput = z.infer<typeof GetTasksSchema>;
