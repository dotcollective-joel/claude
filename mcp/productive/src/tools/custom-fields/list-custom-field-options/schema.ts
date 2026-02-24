import { z } from "zod";

export const ListCustomFieldOptionsSchema = z.object({
  custom_field_id: z.string().optional().describe("Filter options by custom field ID"),
});

export type ListCustomFieldOptionsInput = z.infer<typeof ListCustomFieldOptionsSchema>;
