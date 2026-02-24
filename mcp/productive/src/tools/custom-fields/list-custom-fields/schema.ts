import { z } from "zod";

export const ListCustomFieldsSchema = z.object({});

export type ListCustomFieldsInput = z.infer<typeof ListCustomFieldsSchema>;
