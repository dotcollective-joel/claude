import { z } from "zod";

export const CreateTaskListSchema = z.object({
  name: z.string().describe("Task list name"),
  project_id: z.string().describe("Project ID to create the task list in"),
  board_id: z.string().optional().describe("Board ID to place the task list in"),
});

export type CreateTaskListInput = z.infer<typeof CreateTaskListSchema>;
