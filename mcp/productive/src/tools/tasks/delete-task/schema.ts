import { z } from "zod";

export const DeleteTaskSchema = z.object({
  task_id: z.string().describe("Task ID or Productive.io task URL to delete"),
});

export type DeleteTaskInput = z.infer<typeof DeleteTaskSchema>;
