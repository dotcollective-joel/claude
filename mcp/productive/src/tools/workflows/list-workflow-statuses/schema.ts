import { z } from "zod";

export const ListWorkflowStatusesSchema = z.object({
  workflow_id: z.string().optional().describe("Filter statuses by workflow ID"),
});

export type ListWorkflowStatusesInput = z.infer<typeof ListWorkflowStatusesSchema>;
