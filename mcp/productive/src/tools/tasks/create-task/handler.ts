import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateTaskInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleCreateTask(
  input: CreateTaskInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const attributes: Record<string, unknown> = {
      title: input.title,
    };
    if (input.description !== undefined) attributes.description = input.description;
    if (input.due_date !== undefined) attributes.due_date = input.due_date;
    if (input.start_date !== undefined) attributes.start_date = input.start_date;
    if (input.initial_estimate !== undefined) attributes.initial_estimate = input.initial_estimate;

    const relationships: Record<string, { type: string; id: string }> = {
      project: { type: "projects", id: input.project_id },
    };
    if (input.task_list_id) {
      relationships.task_list = { type: "task_lists", id: input.task_list_id };
    }
    if (input.assignee_id) {
      relationships.assignee = { type: "people", id: input.assignee_id };
    }
    if (input.workflow_status_id) {
      relationships.workflow_status = { type: "workflow_statuses", id: input.workflow_status_id };
    }

    const body = buildJsonApiBody("tasks", attributes, relationships);
    const task = await apiClient.createTask(body);
    const attrs = task.attributes;

    let output = `Task created successfully.\n\n`;
    output += `**ID:** ${task.id}\n`;
    output += `**Title:** ${attrs.title}\n`;
    output += `**Task #:** ${attrs.task_number}\n`;
    if (attrs.due_date) output += `**Due Date:** ${formatDate(attrs.due_date)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create task: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
