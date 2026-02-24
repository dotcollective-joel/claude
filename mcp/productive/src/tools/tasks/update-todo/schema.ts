import { z } from "zod";

export const UpdateTodoSchema = z.object({
  todo_id: z.string().describe("Checklist item ID to update"),
  content: z.string().optional().describe("Updated checklist item text"),
  completed: z.boolean().optional().describe("Set completion status (true/false)"),
});

export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;
