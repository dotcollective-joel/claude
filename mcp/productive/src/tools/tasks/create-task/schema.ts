import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().describe("Task title"),
  description: z.string().optional().describe("Task description"),
  due_date: z.string().optional().describe("Due date (YYYY-MM-DD)"),
  start_date: z.string().optional().describe("Start date (YYYY-MM-DD)"),
  initial_estimate: z.number().optional().describe("Initial time estimate in minutes"),
  project_id: z.string().describe("Project ID to create the task in"),
  task_list_id: z.string().optional().describe("Task list ID to place the task in"),
  assignee_id: z.string().optional().describe("Person ID to assign the task to"),
  workflow_status_id: z.string().optional().describe("Workflow status ID"),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
