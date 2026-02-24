import { z } from "zod";

export const GetCustomFieldSchema = z.object({
  custom_field_id: z.string().describe("The custom field ID"),
});

export type GetCustomFieldInput = z.infer<typeof GetCustomFieldSchema>;
