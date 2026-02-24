import { z } from "zod";

export const GetDealSchema = z.object({
  deal_id: z.string().describe("Deal/budget ID or Productive.io deal URL"),
});

export type GetDealInput = z.infer<typeof GetDealSchema>;
