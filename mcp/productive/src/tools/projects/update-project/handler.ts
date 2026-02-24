import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { UpdateProjectInput } from "./schema.js";
import { buildJsonApiUpdateBody } from "../../../utils/jsonapi.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleUpdateProject(
  input: UpdateProjectInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const { project_id, project_manager_id, ...attrUpdates } = input;

    const attributes: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(attrUpdates)) {
      if (value !== undefined) {
        attributes[key] = value;
      }
    }

    const relationships: Record<string, { type: string; id: string } | null> = {};
    if (project_manager_id !== undefined) {
      relationships.project_manager = project_manager_id === null
        ? null
        : { type: "people", id: project_manager_id };
    }

    const hasRelationships = Object.keys(relationships).length > 0;
    const body = buildJsonApiUpdateBody(
      "projects",
      project_id,
      attributes,
      hasRelationships ? relationships : undefined
    );

    const project = await apiClient.updateProject(project_id, body);
    const attrs = project.attributes;

    let output = `Project updated successfully.\n\n`;
    output += `**ID:** ${project.id}\n`;
    output += `**Name:** ${attrs.name}\n`;
    output += `**Status:** ${attrs.status || "Active"}\n`;
    output += `**Updated:** ${formatDate(attrs.updated_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to update project: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
