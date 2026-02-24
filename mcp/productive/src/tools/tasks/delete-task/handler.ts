import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { DeleteTaskInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";

export async function handleDeleteTask(
  input: DeleteTaskInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const id = resolveId(input.task_id, "tasks");

    if (!id) {
      return {
        content: [{ type: "text", text: "Invalid task ID or URL format." }],
        isError: true,
      };
    }

    await apiClient.deleteTask(id);

    return {
      content: [{ type: "text", text: `Task ${id} deleted successfully.` }],
    };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to delete task: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
