import { z } from "zod";

export const GetWorkflowSchema = z.object({
  workflow_id: z.string().describe("The workflow ID or Productive URL"),
});

export type GetWorkflowInput = z.infer<typeof GetWorkflowSchema>;
