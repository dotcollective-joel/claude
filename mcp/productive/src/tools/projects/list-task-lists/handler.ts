import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListTaskListsInput } from "./schema.js";
import { formatCountSummary } from "../../../utils/formatters.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { ProductiveTaskList } from "../../../types/task.types.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatTaskList(taskList: ProductiveTaskList, included?: JsonApiResource[]): string {
  const attrs = taskList.attributes;
  const projectName = resolveIncludedName(
    included, "projects",
    taskList.relationships?.project?.data?.id,
    "No project"
  );

  return `- **${attrs.name}** (ID: ${taskList.id}) | Project: ${projectName}`;
}

export async function handleListTaskLists(
  input: ListTaskListsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getTaskLists(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No task lists found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "task list");
    const lines = result.data.map((tl) => formatTaskList(tl, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve task lists: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
