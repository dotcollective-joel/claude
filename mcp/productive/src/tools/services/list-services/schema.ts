import { z } from "zod";

export const ListServicesSchema = z.object({
  deal_id: z.string().optional().describe("Filter by deal/budget ID"),
  project_id: z.string().optional().describe("Filter by project ID"),
  person_id: z.string().optional().describe("Filter by person ID"),
  name: z.string().optional().describe("Filter by service name"),
  billing_type: z.string().optional().describe("Filter by billing type"),
  time_tracking_enabled: z.string().optional().describe("Filter by time tracking enabled (true/false)"),
});

export type ListServicesInput = z.infer<typeof ListServicesSchema>;
