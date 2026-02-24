import { z } from "zod";

export const GetInvoiceSchema = z.object({
  invoice_id: z.string().describe("Invoice ID or Productive.io invoice URL"),
});

export type GetInvoiceInput = z.infer<typeof GetInvoiceSchema>;
