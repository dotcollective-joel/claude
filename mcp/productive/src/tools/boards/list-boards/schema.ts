import { z } from "zod";

export const ListBoardsSchema = z.object({
  project_id: z.string().optional().describe("Filter by project ID"),
  status: z.string().optional().describe("Filter by status (1=active, 2=archived)"),
});

export type ListBoardsInput = z.infer<typeof ListBoardsSchema>;
