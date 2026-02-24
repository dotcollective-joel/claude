import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetTimeEntryInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";
import { formatDate, formatMinutes } from "../../../utils/formatters.js";

export async function handleGetTimeEntry(
  input: GetTimeEntryInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const id = resolveId(input.time_entry_id, "time_entries");

    if (!id) {
      return {
        content: [{ type: "text", text: "Invalid time entry ID or URL format." }],
        isError: true,
      };
    }

    const entry = await apiClient.getTimeEntry(id);
    const attrs = entry.attributes;

    let output = `# Time Entry (ID: ${entry.id})\n\n`;
    output += `**Date:** ${formatDate(attrs.date)}\n`;
    output += `**Time:** ${formatMinutes(attrs.time)}\n`;
    if (attrs.billable_time !== null) output += `**Billable Time:** ${formatMinutes(attrs.billable_time)}\n`;
    if (attrs.note) output += `**Note:** ${attrs.note}\n`;
    output += `**Approved:** ${attrs.approved ? "Yes" : "No"}\n`;
    if (attrs.approved_at) output += `**Approved At:** ${formatDate(attrs.approved_at)}\n`;
    output += `**Invoiced:** ${attrs.invoiced ? "Yes" : "No"}\n`;
    if (attrs.rejected) output += `**Rejected:** Yes\n`;
    if (attrs.rejected_reason) output += `**Rejected Reason:** ${attrs.rejected_reason}\n`;
    output += `**Overhead:** ${attrs.overhead ? "Yes" : "No"}\n`;
    output += `**Created:** ${formatDate(attrs.created_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve time entry: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
