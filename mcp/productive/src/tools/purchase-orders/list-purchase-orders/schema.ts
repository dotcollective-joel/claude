import { z } from "zod";

export const ListPurchaseOrdersSchema = z.object({
  company_id: z.string().optional().describe("Filter by company ID"),
  deal_id: z.string().optional().describe("Filter by deal ID"),
  status: z.string().optional().describe("Filter by status"),
  query: z.string().optional().describe("Search query"),
});

export type ListPurchaseOrdersInput = z.infer<typeof ListPurchaseOrdersSchema>;
