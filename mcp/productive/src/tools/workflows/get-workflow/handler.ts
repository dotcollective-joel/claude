import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetWorkflowInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";
import { JsonApiResource } from "../../../types/common.types.js";

export async function handleGetWorkflow(
  input: GetWorkflowInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const id = resolveId(input.workflow_id, "workflows");

    if (!id) {
      return {
        content: [{ type: "text", text: "Invalid workflow ID or URL format." }],
        isError: true,
      };
    }

    const response = await apiClient.getWorkflow(id);
    const workflow = response.data;
    const attrs = workflow.attributes;
    const included = response.included || [];

    let output = `# ${attrs.name}\n\n`;
    output += `**Workflow ID:** ${workflow.id}\n`;
    if (attrs.archived_at) output += `**Archived:** ${attrs.archived_at}\n`;

    // List statuses from included
    const statuses = included
      .filter((r: JsonApiResource) => r.type === "workflow_statuses")
      .sort((a: JsonApiResource, b: JsonApiResource) =>
        ((a.attributes?.position as number) || 0) - ((b.attributes?.position as number) || 0)
      );

    if (statuses.length > 0) {
      output += `\n## Statuses (${statuses.length})\n`;
      for (const status of statuses) {
        const name = status.attributes?.name || "Unnamed";
        const categoryId = status.attributes?.category_id;
        const color = status.attributes?.color;
        let line = `- **${name}** (ID: ${status.id})`;
        if (categoryId !== undefined) line += ` | Category: ${categoryId}`;
        if (color) line += ` | Color: ${color}`;
        output += `${line}\n`;
      }
    }

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve workflow: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
