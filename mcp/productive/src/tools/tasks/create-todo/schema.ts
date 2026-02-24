import { z } from "zod";

export const CreateTodoSchema = z.object({
  content: z.string().describe("Checklist item text"),
  task_id: z.string().describe("Task ID to add the checklist item to"),
});

export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
