import { z } from "zod";

export const GetProjectSchema = z.object({
  project_id: z.string().describe("Project ID or Productive.io project URL"),
});

export type GetProjectInput = z.infer<typeof GetProjectSchema>;
