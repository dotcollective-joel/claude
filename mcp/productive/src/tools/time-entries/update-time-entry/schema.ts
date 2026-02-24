import { z } from "zod";

export const UpdateTimeEntrySchema = z.object({
  time_entry_id: z.string().describe("Time entry ID to update"),
  date: z.string().optional().describe("Updated date (YYYY-MM-DD)"),
  time: z.number().optional().describe("Updated time in minutes"),
  billable_time: z.number().optional().describe("Updated billable time in minutes"),
  note: z.string().optional().describe("Updated note"),
});

export type UpdateTimeEntryInput = z.infer<typeof UpdateTimeEntrySchema>;
