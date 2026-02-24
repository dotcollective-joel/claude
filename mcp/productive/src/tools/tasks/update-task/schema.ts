import { z } from "zod";

export const UpdateTaskSchema = z.object({
  task_id: z.string().describe("Task ID to update"),
  title: z.string().optional().describe("Updated title"),
  description: z.string().optional().describe("Updated description"),
  due_date: z.string().nullable().optional().describe("Updated due date (YYYY-MM-DD) or null to clear"),
  start_date: z.string().nullable().optional().describe("Updated start date (YYYY-MM-DD) or null to clear"),
  initial_estimate: z.number().nullable().optional().describe("Updated initial estimate in minutes or null to clear"),
  remaining_time: z.number().nullable().optional().describe("Updated remaining time in minutes or null to clear"),
  closed: z.boolean().optional().describe("Set to true to close, false to reopen"),
  assignee_id: z.string().nullable().optional().describe("Person ID to assign or null to unassign"),
  workflow_status_id: z.string().optional().describe("Workflow status ID to move to"),
  task_list_id: z.string().optional().describe("Task list ID to move to"),
});

export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
