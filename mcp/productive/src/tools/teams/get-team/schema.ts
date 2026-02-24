import { z } from "zod";

export const GetTeamSchema = z.object({
  team_id: z.string().describe("The team ID or Productive URL"),
});

export type GetTeamInput = z.infer<typeof GetTeamSchema>;
