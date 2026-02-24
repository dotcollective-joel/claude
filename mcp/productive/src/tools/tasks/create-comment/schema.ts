import { z } from "zod";

export const CreateCommentSchema = z.object({
  content: z.string().describe("Comment text (supports markdown)"),
  task_id: z.string().optional().describe("Task ID to comment on"),
  deal_id: z.string().optional().describe("Deal ID to comment on"),
});

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
