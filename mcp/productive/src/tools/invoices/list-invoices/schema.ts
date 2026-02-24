import { z } from "zod";

export const ListInvoicesSchema = z.object({
  company_id: z.string().optional().describe("Filter by company ID"),
  deal_id: z.string().optional().describe("Filter by deal/budget ID"),
  project_id: z.string().optional().describe("Filter by project ID"),
  invoice_state: z.string().optional().describe("Filter by invoice state (draft, sent, paid, etc.)"),
  payment_status: z.string().optional().describe("Filter by payment status (unpaid, partially_paid, paid)"),
  currency: z.string().optional().describe("Filter by currency code (e.g., AUD, USD)"),
  invoiced_on_after: z.string().optional().describe("Filter invoices after this date (YYYY-MM-DD)"),
  invoiced_on_before: z.string().optional().describe("Filter invoices before this date (YYYY-MM-DD)"),
  query: z.string().optional().describe("Search query to filter invoices"),
});

export type ListInvoicesInput = z.infer<typeof ListInvoicesSchema>;
