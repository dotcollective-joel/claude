import { z } from "zod";

export const ListTeamsSchema = z.object({
  name: z.string().optional().describe("Filter teams by name"),
});

export type ListTeamsInput = z.infer<typeof ListTeamsSchema>;
