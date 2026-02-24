import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { UpdateTodoInput } from "./schema.js";
import { buildJsonApiUpdateBody } from "../../../utils/jsonapi.js";

export async function handleUpdateTodo(
  input: UpdateTodoInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const { todo_id, ...updates } = input;

    const attributes: Record<string, unknown> = {};
    if (updates.content !== undefined) attributes.content = updates.content;
    if (updates.completed !== undefined) attributes.completed = updates.completed;

    if (Object.keys(attributes).length === 0) {
      return {
        content: [{ type: "text", text: "No update fields provided." }],
        isError: true,
      };
    }

    const body = buildJsonApiUpdateBody("todos", todo_id, attributes);
    const todo = await apiClient.updateTodo(todo_id, body);

    let output = `Checklist item updated successfully.\n\n`;
    output += `**ID:** ${todo.id}\n`;
    output += `**Content:** ${todo.attributes.content}\n`;
    output += `**Completed:** ${todo.attributes.completed ? "Yes" : "No"}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to update checklist item: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
