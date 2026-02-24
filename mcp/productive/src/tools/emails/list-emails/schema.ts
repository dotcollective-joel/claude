import { z } from "zod";

export const ListEmailsSchema = z.object({
  deal_id: z.string().optional().describe("Filter by deal ID"),
});

export type ListEmailsInput = z.infer<typeof ListEmailsSchema>;
