import { z } from "zod";

export const ListTaskListsSchema = z.object({
  project_id: z.string().optional().describe("Filter by project ID"),
  board_id: z.string().optional().describe("Filter by board ID"),
});

export type ListTaskListsInput = z.infer<typeof ListTaskListsSchema>;
