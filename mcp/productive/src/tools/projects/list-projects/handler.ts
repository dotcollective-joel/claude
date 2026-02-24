import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListProjectsInput } from "./schema.js";
import { ProductiveProject } from "../../../types/project.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatProject(project: ProductiveProject, included?: JsonApiResource[]): string {
  const attrs = project.attributes;
  const companyName = resolveIncludedName(
    included, "companies",
    project.relationships?.company?.data?.id,
    "No company"
  );

  let output = `**${attrs.name}** (ID: ${project.id})\n`;
  output += `  Company: ${companyName}`;
  output += ` | Status: ${attrs.status || "Active"}`;
  if (attrs.last_activity_at) output += ` | Last Activity: ${formatDate(attrs.last_activity_at)}`;
  return output;
}

export async function handleListProjects(
  input: ListProjectsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getProjects(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No projects found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "project");
    const lines = result.data.map((p) => formatProject(p, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve projects: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
