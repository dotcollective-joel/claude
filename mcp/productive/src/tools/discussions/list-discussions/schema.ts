import { z } from "zod";

export const ListDiscussionsSchema = z.object({
  person_id: z.string().optional().describe("Filter by person ID"),
  task_id: z.string().optional().describe("Filter by task ID"),
  deal_id: z.string().optional().describe("Filter by deal ID"),
  project_id: z.string().optional().describe("Filter by project ID"),
});

export type ListDiscussionsInput = z.infer<typeof ListDiscussionsSchema>;
