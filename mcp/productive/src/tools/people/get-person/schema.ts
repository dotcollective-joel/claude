import { z } from "zod";

export const GetPersonSchema = z.object({
  person_id: z.string().describe("Person ID or Productive.io person URL"),
});

export type GetPersonInput = z.infer<typeof GetPersonSchema>;
