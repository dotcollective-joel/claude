import { z } from "zod";

export const UpdateProjectSchema = z.object({
  project_id: z.string().describe("Project ID to update"),
  name: z.string().optional().describe("Updated project name"),
  description: z.string().optional().describe("Updated project description"),
  color: z.string().optional().describe("Updated project color"),
  project_manager_id: z.string().nullable().optional().describe("Person ID for project manager or null to clear"),
});

export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
