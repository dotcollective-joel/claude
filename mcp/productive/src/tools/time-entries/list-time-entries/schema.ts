import { z } from "zod";

export const ListTimeEntriesSchema = z.object({
  person_id: z.string().optional().describe("Filter by person ID"),
  project_id: z.string().optional().describe("Filter by project ID"),
  service_id: z.string().optional().describe("Filter by service ID"),
  task_id: z.string().optional().describe("Filter by task ID"),
  deal_id: z.string().optional().describe("Filter by deal/budget ID"),
  after: z.string().optional().describe("Filter entries after this date (YYYY-MM-DD)"),
  before: z.string().optional().describe("Filter entries before this date (YYYY-MM-DD)"),
  status: z.string().optional().describe("Filter by status (1=approved, 2=rejected, 3=pending)"),
  invoiced: z.string().optional().describe("Filter by invoiced status (true/false)"),
});

export type ListTimeEntriesInput = z.infer<typeof ListTimeEntriesSchema>;
