import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateTodoInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";

export async function handleCreateTodo(
  input: CreateTodoInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const body = buildJsonApiBody(
      "todos",
      { content: input.content },
      { task: { type: "tasks", id: input.task_id } }
    );

    const todo = await apiClient.createTodo(body);

    let output = `Checklist item created successfully.\n\n`;
    output += `**ID:** ${todo.id}\n`;
    output += `**Content:** ${todo.attributes.content}\n`;
    output += `**Completed:** ${todo.attributes.completed ? "Yes" : "No"}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create checklist item: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
