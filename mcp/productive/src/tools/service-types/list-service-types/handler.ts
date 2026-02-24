import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListServiceTypesInput } from "./schema.js";
import { ProductiveServiceType } from "../../../types/service.types.js";
import { formatCountSummary } from "../../../utils/formatters.js";

function formatServiceType(serviceType: ProductiveServiceType): string {
  const attrs = serviceType.attributes;
  let output = `**${attrs.name}** (ID: ${serviceType.id})`;
  if (attrs.archived_at) output += ` | Archived: ${attrs.archived_at}`;
  return output;
}

export async function handleListServiceTypes(
  _input: ListServiceTypesInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getServiceTypes();

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No service types found." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "service type");
    const lines = result.data.map((st) => formatServiceType(st));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve service types: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
