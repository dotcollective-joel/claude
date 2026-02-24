import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetProjectInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleGetProject(
  input: GetProjectInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const projectId = resolveId(input.project_id, "projects");

    if (!projectId) {
      return {
        content: [{ type: "text", text: "Invalid project ID or URL format." }],
        isError: true,
      };
    }

    const project = await apiClient.getProject(projectId);
    const attrs = project.attributes;

    let output = `# ${attrs.name}\n\n`;
    output += `**Project ID:** ${project.id}\n`;
    if (attrs.project_number) output += `**Project #:** ${attrs.project_number}\n`;
    if (attrs.description) output += `**Description:** ${attrs.description}\n`;
    output += `**Status:** ${attrs.status || "Active"}\n`;
    if (attrs.color) output += `**Color:** ${attrs.color}\n`;
    output += `**Created:** ${formatDate(attrs.created_at)}\n`;
    output += `**Last Updated:** ${formatDate(attrs.updated_at)}\n`;
    if (attrs.last_activity_at) output += `**Last Activity:** ${formatDate(attrs.last_activity_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve project: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
