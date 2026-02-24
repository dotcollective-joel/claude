import { z } from "zod";

export const ListPaymentsSchema = z.object({
  company_id: z.string().optional().describe("Filter by company ID"),
  deal_id: z.string().optional().describe("Filter by deal ID"),
  invoice_id: z.string().optional().describe("Filter by invoice ID"),
});

export type ListPaymentsInput = z.infer<typeof ListPaymentsSchema>;
