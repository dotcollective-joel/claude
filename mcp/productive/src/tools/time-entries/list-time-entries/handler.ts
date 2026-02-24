import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListTimeEntriesInput } from "./schema.js";
import { ProductiveTimeEntry } from "../../../types/time-entry.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate, formatMinutes } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatTimeEntry(entry: ProductiveTimeEntry, included?: JsonApiResource[]): string {
  const attrs = entry.attributes;
  const personName = resolveIncludedName(
    included, "people",
    entry.relationships?.person?.data?.id,
    "Unknown"
  );
  const serviceName = resolveIncludedName(
    included, "services",
    entry.relationships?.service?.data?.id,
    "No service"
  );

  let output = `**${personName}** — ${formatMinutes(attrs.time)} on ${formatDate(attrs.date)}\n`;
  output += `  Service: ${serviceName}`;
  if (attrs.note) output += ` | Note: ${attrs.note}`;
  output += ` | Approved: ${attrs.approved ? "Yes" : "No"}`;
  if (attrs.invoiced) output += ` | Invoiced`;
  return output;
}

export async function handleListTimeEntries(
  input: ListTimeEntriesInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getTimeEntries(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No time entries found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "time entry", "time entries");
    const lines = result.data.map((e) => formatTimeEntry(e, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve time entries: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
