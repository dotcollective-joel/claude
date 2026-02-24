import { z } from "zod";

export const CreateDiscussionSchema = z.object({
  title: z.string().describe("Title of the discussion"),
  body: z.string().optional().describe("Body content of the discussion"),
  task_id: z.string().optional().describe("Task ID to associate the discussion with"),
  deal_id: z.string().optional().describe("Deal ID to associate the discussion with"),
  project_id: z.string().optional().describe("Project ID to associate the discussion with"),
});

export type CreateDiscussionInput = z.infer<typeof CreateDiscussionSchema>;
