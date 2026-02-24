import { z } from "zod";

export const GetServiceSchema = z.object({
  service_id: z.string().describe("Service ID or Productive.io service URL"),
});

export type GetServiceInput = z.infer<typeof GetServiceSchema>;
