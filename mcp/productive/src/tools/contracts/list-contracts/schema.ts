import { z } from "zod";

export const ListContractsSchema = z.object({
  company_id: z.string().optional().describe("Filter by company ID"),
  deal_id: z.string().optional().describe("Filter by deal ID"),
  responsible_id: z.string().optional().describe("Filter by responsible person ID"),
  query: z.string().optional().describe("Search query"),
});

export type ListContractsInput = z.infer<typeof ListContractsSchema>;
