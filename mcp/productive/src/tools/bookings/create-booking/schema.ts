import { z } from "zod";

export const CreateBookingSchema = z.object({
  person_id: z.string().describe("Person ID to book"),
  service_id: z.string().describe("Service ID to book against"),
  started_on: z.string().describe("Start date (YYYY-MM-DD)"),
  ended_on: z.string().describe("End date (YYYY-MM-DD)"),
  time: z.number().optional().describe("Time in minutes per day"),
  percentage: z.number().optional().describe("Percentage allocation (0-100)"),
  note: z.string().optional().describe("Optional note for the booking"),
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
