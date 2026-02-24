import { z } from "zod";

export const ListBookingsSchema = z.object({
  person_id: z.string().optional().describe("Filter by person ID"),
  project_id: z.string().optional().describe("Filter by project ID"),
  company_id: z.string().optional().describe("Filter by company ID"),
  budget_id: z.string().optional().describe("Filter by budget/deal ID"),
  after: z.string().optional().describe("Filter bookings after this date (YYYY-MM-DD)"),
  before: z.string().optional().describe("Filter bookings before this date (YYYY-MM-DD)"),
  approval_status: z.string().optional().describe("Filter by approval status"),
  draft: z.string().optional().describe("Filter by draft status (true/false)"),
  canceled: z.string().optional().describe("Filter by canceled status (true/false)"),
});

export type ListBookingsInput = z.infer<typeof ListBookingsSchema>;
