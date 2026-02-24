/**
 * Get Task Tool Schema
 */

import { z } from "zod";

export const GetTaskSchema = z.object({
  url: z.string().describe("Productive.io task URL"),
  include_subtasks: z.boolean().optional().describe("Include subtasks in the response"),
  include_todos: z.boolean().optional().describe("Include todos (checklist items) in the response"),
  include_comments: z.boolean().optional().describe("Include comments in the response"),
});

export type GetTaskInput = z.infer<typeof GetTaskSchema>;
