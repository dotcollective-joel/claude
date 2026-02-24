import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListWorkflowsInput } from "./schema.js";
import { ProductiveWorkflow } from "../../../types/workflow.types.js";
import { formatCountSummary } from "../../../utils/formatters.js";

function formatWorkflow(workflow: ProductiveWorkflow): string {
  const attrs = workflow.attributes;
  let output = `**${attrs.name}** (ID: ${workflow.id})`;
  if (attrs.archived_at) output += ` | Archived: ${attrs.archived_at}`;
  return output;
}

export async function handleListWorkflows(
  input: ListWorkflowsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getWorkflows(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No workflows found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "workflow");
    const lines = result.data.map((w) => formatWorkflow(w));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve workflows: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
