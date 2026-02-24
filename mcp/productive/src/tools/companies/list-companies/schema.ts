import { z } from "zod";

export const ListCompaniesSchema = z.object({
  name: z.string().optional().describe("Filter by company name"),
  status: z.string().optional().describe("Filter by status (1=active, 2=archived)"),
  subsidiary_id: z.string().optional().describe("Filter by subsidiary ID"),
  query: z.string().optional().describe("Search query to filter companies"),
});

export type ListCompaniesInput = z.infer<typeof ListCompaniesSchema>;
