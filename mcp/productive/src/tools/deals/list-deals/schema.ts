import { z } from "zod";

export const ListDealsSchema = z.object({
  company_id: z.string().optional().describe("Filter by company ID"),
  responsible_id: z.string().optional().describe("Filter by responsible person ID"),
  project_id: z.string().optional().describe("Filter by project ID"),
  status_id: z.string().optional().describe("Filter by deal status ID"),
  budget_status: z.string().optional().describe("Filter by budget status"),
  deal_type_id: z.string().optional().describe("Filter by deal type ID"),
  query: z.string().optional().describe("Search query to filter deals by name"),
});

export type ListDealsInput = z.infer<typeof ListDealsSchema>;
