import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { UpdateTaskInput } from "./schema.js";
import { buildJsonApiUpdateBody } from "../../../utils/jsonapi.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleUpdateTask(
  input: UpdateTaskInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const { task_id, assignee_id, workflow_status_id, task_list_id, ...attrUpdates } = input;

    const attributes: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(attrUpdates)) {
      if (value !== undefined) {
        attributes[key] = value;
      }
    }

    const relationships: Record<string, { type: string; id: string } | null> = {};
    if (assignee_id !== undefined) {
      relationships.assignee = assignee_id === null
        ? null
        : { type: "people", id: assignee_id };
    }
    if (workflow_status_id !== undefined) {
      relationships.workflow_status = { type: "workflow_statuses", id: workflow_status_id };
    }
    if (task_list_id !== undefined) {
      relationships.task_list = { type: "task_lists", id: task_list_id };
    }

    const hasRelationships = Object.keys(relationships).length > 0;
    const body = buildJsonApiUpdateBody(
      "tasks",
      task_id,
      attributes,
      hasRelationships ? relationships : undefined
    );

    const task = await apiClient.updateTask(task_id, body);
    const attrs = task.attributes;

    let output = `Task updated successfully.\n\n`;
    output += `**ID:** ${task.id}\n`;
    output += `**Title:** ${attrs.title}\n`;
    output += `**Status:** ${attrs.closed ? "Closed" : "Open"}\n`;
    if (attrs.due_date) output += `**Due Date:** ${formatDate(attrs.due_date)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to update task: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
