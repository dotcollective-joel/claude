import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateSubtaskInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleCreateSubtask(
  input: CreateSubtaskInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const attributes: Record<string, unknown> = {
      title: input.title,
    };
    if (input.description !== undefined) attributes.description = input.description;
    if (input.due_date !== undefined) attributes.due_date = input.due_date;

    const relationships: Record<string, { type: string; id: string }> = {
      project: { type: "projects", id: input.project_id },
      parent_task: { type: "tasks", id: input.parent_task_id },
    };
    if (input.assignee_id) {
      relationships.assignee = { type: "people", id: input.assignee_id };
    }

    const body = buildJsonApiBody("tasks", attributes, relationships);
    const task = await apiClient.createTask(body);
    const attrs = task.attributes;

    let output = `Subtask created successfully.\n\n`;
    output += `**ID:** ${task.id}\n`;
    output += `**Title:** ${attrs.title}\n`;
    output += `**Task #:** ${attrs.task_number}\n`;
    output += `**Parent Task ID:** ${input.parent_task_id}\n`;
    if (attrs.due_date) output += `**Due Date:** ${formatDate(attrs.due_date)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create subtask: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
