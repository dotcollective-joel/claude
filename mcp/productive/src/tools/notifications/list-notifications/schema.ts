import { z } from "zod";

export const ListNotificationsSchema = z.object({});

export type ListNotificationsInput = z.infer<typeof ListNotificationsSchema>;
