import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListServicesInput } from "./schema.js";
import { ProductiveService } from "../../../types/service.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatCurrency, formatMinutes } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatService(service: ProductiveService, included?: JsonApiResource[]): string {
  const attrs = service.attributes;
  const dealName = resolveIncludedName(
    included, "deals",
    service.relationships?.deal?.data?.id,
    "No deal"
  );

  let output = `**${attrs.name}** (ID: ${service.id})\n`;
  output += `  Deal: ${dealName}`;
  if (attrs.price) output += ` | Price: ${formatCurrency(attrs.price, attrs.currency || undefined)}`;
  if (attrs.worked_time !== null) output += ` | Worked: ${formatMinutes(attrs.worked_time)}`;
  output += ` | Revenue: ${formatCurrency(attrs.revenue, attrs.currency || undefined)}`;
  return output;
}

export async function handleListServices(
  input: ListServicesInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getServices(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No services found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "service");
    const lines = result.data.map((s) => formatService(s, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve services: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
