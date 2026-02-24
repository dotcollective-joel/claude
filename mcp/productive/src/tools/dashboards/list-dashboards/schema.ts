import { z } from "zod";

export const ListDashboardsSchema = z.object({});

export type ListDashboardsInput = z.infer<typeof ListDashboardsSchema>;
