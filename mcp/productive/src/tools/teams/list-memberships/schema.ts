import { z } from "zod";

export const ListMembershipsSchema = z.object({
  team_id: z.string().optional().describe("Filter by team ID"),
  person_id: z.string().optional().describe("Filter by person ID"),
});

export type ListMembershipsInput = z.infer<typeof ListMembershipsSchema>;
