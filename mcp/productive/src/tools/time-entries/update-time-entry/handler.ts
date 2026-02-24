import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { UpdateTimeEntryInput } from "./schema.js";
import { buildJsonApiUpdateBody } from "../../../utils/jsonapi.js";
import { formatDate, formatMinutes } from "../../../utils/formatters.js";

export async function handleUpdateTimeEntry(
  input: UpdateTimeEntryInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const { time_entry_id, ...updates } = input;

    const attributes: Record<string, unknown> = {};
    if (updates.date !== undefined) attributes.date = updates.date;
    if (updates.time !== undefined) attributes.time = updates.time;
    if (updates.billable_time !== undefined) attributes.billable_time = updates.billable_time;
    if (updates.note !== undefined) attributes.note = updates.note;

    if (Object.keys(attributes).length === 0) {
      return {
        content: [{ type: "text", text: "No update fields provided." }],
        isError: true,
      };
    }

    const body = buildJsonApiUpdateBody("time_entries", time_entry_id, attributes);
    const entry = await apiClient.updateTimeEntry(time_entry_id, body);
    const attrs = entry.attributes;

    let output = `Time entry updated successfully.\n\n`;
    output += `**ID:** ${entry.id}\n`;
    output += `**Date:** ${formatDate(attrs.date)}\n`;
    output += `**Time:** ${formatMinutes(attrs.time)}\n`;
    if (attrs.billable_time !== null) output += `**Billable Time:** ${formatMinutes(attrs.billable_time)}\n`;
    if (attrs.note) output += `**Note:** ${attrs.note}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to update time entry: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
