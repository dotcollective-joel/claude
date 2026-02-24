import { z } from "zod";

export const ListPeopleSchema = z.object({
  company_id: z.string().optional().describe("Filter by company ID"),
  role_id: z.string().optional().describe("Filter by role ID"),
  team: z.string().optional().describe("Filter by team ID"),
  status: z.string().optional().describe("Filter by status"),
  project_id: z.string().optional().describe("Filter by project ID"),
  query: z.string().optional().describe("Search query to filter people by name or email"),
});

export type ListPeopleInput = z.infer<typeof ListPeopleSchema>;
