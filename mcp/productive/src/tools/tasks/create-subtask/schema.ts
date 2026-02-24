import { z } from "zod";

export const CreateSubtaskSchema = z.object({
  title: z.string().describe("Subtask title"),
  description: z.string().optional().describe("Subtask description"),
  due_date: z.string().optional().describe("Due date (YYYY-MM-DD)"),
  parent_task_id: z.string().describe("Parent task ID"),
  project_id: z.string().describe("Project ID"),
  assignee_id: z.string().optional().describe("Person ID to assign the subtask to"),
});

export type CreateSubtaskInput = z.infer<typeof CreateSubtaskSchema>;
