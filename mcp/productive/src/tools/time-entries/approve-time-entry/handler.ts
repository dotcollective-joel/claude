import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ApproveTimeEntryInput } from "./schema.js";
import { buildJsonApiUpdateBody } from "../../../utils/jsonapi.js";
import { formatDate, formatMinutes } from "../../../utils/formatters.js";

export async function handleApproveTimeEntry(
  input: ApproveTimeEntryInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const body = buildJsonApiUpdateBody("time_entries", input.time_entry_id, {
      approved: true,
    });

    const entry = await apiClient.updateTimeEntry(input.time_entry_id, body);
    const attrs = entry.attributes;

    let output = `Time entry approved successfully.\n\n`;
    output += `**ID:** ${entry.id}\n`;
    output += `**Date:** ${formatDate(attrs.date)}\n`;
    output += `**Time:** ${formatMinutes(attrs.time)}\n`;
    if (attrs.note) output += `**Note:** ${attrs.note}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to approve time entry: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
