import { z } from "zod";

export const CreateTimeEntrySchema = z.object({
  date: z.string().describe("Date for the time entry (YYYY-MM-DD)"),
  time: z.number().describe("Time in minutes"),
  note: z.string().optional().describe("Optional note for the time entry"),
  person_id: z.string().describe("Person ID to log time for"),
  service_id: z.string().describe("Service ID to log time against"),
  task_id: z.string().optional().describe("Optional task ID to associate with"),
});

export type CreateTimeEntryInput = z.infer<typeof CreateTimeEntrySchema>;
