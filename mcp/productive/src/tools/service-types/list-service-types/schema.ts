import { z } from "zod";

export const ListServiceTypesSchema = z.object({});

export type ListServiceTypesInput = z.infer<typeof ListServiceTypesSchema>;
