import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateTimeEntryInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";
import { formatDate, formatMinutes } from "../../../utils/formatters.js";

export async function handleCreateTimeEntry(
  input: CreateTimeEntryInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const relationships: Record<string, { type: string; id: string }> = {
      person: { type: "people", id: input.person_id },
      service: { type: "services", id: input.service_id },
    };

    if (input.task_id) {
      relationships.task = { type: "tasks", id: input.task_id };
    }

    const body = buildJsonApiBody(
      "time_entries",
      {
        date: input.date,
        time: input.time,
        note: input.note || null,
      },
      relationships
    );

    const entry = await apiClient.createTimeEntry(body);
    const attrs = entry.attributes;

    let output = `Time entry created successfully.\n\n`;
    output += `**ID:** ${entry.id}\n`;
    output += `**Date:** ${formatDate(attrs.date)}\n`;
    output += `**Time:** ${formatMinutes(attrs.time)}\n`;
    if (attrs.note) output += `**Note:** ${attrs.note}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create time entry: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
