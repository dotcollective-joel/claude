import { z } from "zod";

export const ListActivitiesSchema = z.object({
  person_id: z.string().optional().describe("Filter by person ID"),
  project_id: z.string().optional().describe("Filter by project ID"),
  task_id: z.string().optional().describe("Filter by task ID"),
  deal_id: z.string().optional().describe("Filter by deal/budget ID"),
  company_id: z.string().optional().describe("Filter by company ID"),
  after: z.string().optional().describe("Filter activities after this date (YYYY-MM-DD)"),
  before: z.string().optional().describe("Filter activities before this date (YYYY-MM-DD)"),
});

export type ListActivitiesInput = z.infer<typeof ListActivitiesSchema>;
