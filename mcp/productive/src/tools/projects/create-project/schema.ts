import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string().describe("Project name"),
  description: z.string().optional().describe("Project description"),
  company_id: z.string().describe("Company ID to associate the project with"),
  project_manager_id: z.string().optional().describe("Person ID for the project manager"),
  workflow_id: z.string().optional().describe("Workflow ID to use for this project"),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
