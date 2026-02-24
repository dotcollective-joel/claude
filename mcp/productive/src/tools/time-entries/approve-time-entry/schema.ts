import { z } from "zod";

export const ApproveTimeEntrySchema = z.object({
  time_entry_id: z.string().describe("The ID of the time entry to approve"),
});

export type ApproveTimeEntryInput = z.infer<typeof ApproveTimeEntrySchema>;
