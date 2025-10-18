/**
 * Get Tasks Tool Schema
 */

import { z } from "zod";

export const GetTasksSchema = z.object({
  assignee_id: z.string().optional().describe("Filter by assignee ID"),
  status: z.number().optional().describe("Filter by status (1=Open, 2=Closed)"),
  project_id: z.string().optional().describe("Filter by project ID"),
});

export type GetTasksInput = z.infer<typeof GetTasksSchema>;
