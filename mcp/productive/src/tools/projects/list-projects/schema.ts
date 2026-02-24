import { z } from "zod";

export const ListProjectsSchema = z.object({
  company_id: z.string().optional().describe("Filter by company ID"),
  responsible_id: z.string().optional().describe("Filter by responsible person ID"),
  status: z.string().optional().describe("Filter by status (1=active, 2=archived)"),
  project_type: z.string().optional().describe("Filter by project type (1=internal, 2=client)"),
  query: z.string().optional().describe("Search query to filter projects by name"),
});

export type ListProjectsInput = z.infer<typeof ListProjectsSchema>;
