/**
 * Get Task Tool Schema
 */

import { z } from "zod";

export const GetTaskSchema = z.object({
  url: z.string().describe("Productive.io task URL"),
});

export type GetTaskInput = z.infer<typeof GetTaskSchema>;
