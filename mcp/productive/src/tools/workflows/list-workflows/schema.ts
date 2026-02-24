import { z } from "zod";

export const ListWorkflowsSchema = z.object({
  name: z.string().optional().describe("Filter workflows by name"),
  archived: z.string().optional().describe("Filter by archived status ('true' or 'false')"),
});

export type ListWorkflowsInput = z.infer<typeof ListWorkflowsSchema>;
