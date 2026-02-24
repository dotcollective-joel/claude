import { z } from "zod";

export const ListExpensesSchema = z.object({
  person_id: z.string().optional().describe("Filter by person ID"),
  company_id: z.string().optional().describe("Filter by company ID"),
  project_id: z.string().optional().describe("Filter by project ID"),
  service_id: z.string().optional().describe("Filter by service ID"),
  date_after: z.string().optional().describe("Filter expenses after this date (YYYY-MM-DD)"),
  date_before: z.string().optional().describe("Filter expenses before this date (YYYY-MM-DD)"),
  status: z.string().optional().describe("Filter by status"),
  invoiced: z.string().optional().describe("Filter by invoiced status (true/false)"),
  approval_status: z.string().optional().describe("Filter by approval status"),
  query: z.string().optional().describe("Search query to filter expenses"),
});

export type ListExpensesInput = z.infer<typeof ListExpensesSchema>;
