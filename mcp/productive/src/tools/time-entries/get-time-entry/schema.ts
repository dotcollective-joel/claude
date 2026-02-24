import { z } from "zod";

export const GetTimeEntrySchema = z.object({
  time_entry_id: z.string().describe("Time entry ID or Productive.io time entry URL"),
});

export type GetTimeEntryInput = z.infer<typeof GetTimeEntrySchema>;
