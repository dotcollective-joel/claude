import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListWorkflowStatusesInput } from "./schema.js";
import { ProductiveWorkflowStatus } from "../../../types/workflow.types.js";
import { formatCountSummary } from "../../../utils/formatters.js";

function formatWorkflowStatus(status: ProductiveWorkflowStatus): string {
  const attrs = status.attributes;
  let output = `**${attrs.name}** (ID: ${status.id})`;
  output += ` | Category: ${attrs.category_id}`;
  output += ` | Position: ${attrs.position}`;
  if (attrs.color) output += ` | Color: ${attrs.color}`;
  return output;
}

export async function handleListWorkflowStatuses(
  input: ListWorkflowStatusesInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getWorkflowStatuses(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No workflow statuses found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "workflow status", "workflow statuses");
    const lines = result.data.map((s) => formatWorkflowStatus(s));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve workflow statuses: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
