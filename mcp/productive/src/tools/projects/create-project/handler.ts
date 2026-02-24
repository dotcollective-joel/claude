import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateProjectInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleCreateProject(
  input: CreateProjectInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const attributes: Record<string, unknown> = {
      name: input.name,
    };
    if (input.description !== undefined) attributes.description = input.description;

    const relationships: Record<string, { type: string; id: string }> = {
      company: { type: "companies", id: input.company_id },
    };
    if (input.project_manager_id) {
      relationships.project_manager = { type: "people", id: input.project_manager_id };
    }
    if (input.workflow_id) {
      relationships.workflow = { type: "workflows", id: input.workflow_id };
    }

    const body = buildJsonApiBody("projects", attributes, relationships);
    const project = await apiClient.createProject(body);
    const attrs = project.attributes;

    let output = `Project created successfully.\n\n`;
    output += `**ID:** ${project.id}\n`;
    output += `**Name:** ${attrs.name}\n`;
    output += `**Project #:** ${attrs.project_number}\n`;
    output += `**Status:** ${attrs.status || "Active"}\n`;
    output += `**Created:** ${formatDate(attrs.created_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create project: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
