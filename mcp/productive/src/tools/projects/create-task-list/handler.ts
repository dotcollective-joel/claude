import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateTaskListInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";

export async function handleCreateTaskList(
  input: CreateTaskListInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const relationships: Record<string, { type: string; id: string }> = {
      project: { type: "projects", id: input.project_id },
    };
    if (input.board_id) {
      relationships.board = { type: "boards", id: input.board_id };
    }

    const body = buildJsonApiBody(
      "task_lists",
      { name: input.name },
      relationships
    );

    const taskList = await apiClient.createTaskList(body);

    let output = `Task list created successfully.\n\n`;
    output += `**ID:** ${taskList.id}\n`;
    output += `**Name:** ${taskList.attributes.name}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create task list: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
