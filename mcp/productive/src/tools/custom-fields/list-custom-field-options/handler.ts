import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListCustomFieldOptionsInput } from "./schema.js";
import { ProductiveCustomFieldOption } from "../../../types/custom-field.types.js";
import { formatCountSummary } from "../../../utils/formatters.js";

function formatOption(option: ProductiveCustomFieldOption): string {
  const attrs = option.attributes;
  let output = `**${attrs.value}** (ID: ${option.id})`;
  output += ` | Position: ${attrs.position}`;
  if (attrs.color) output += ` | Color: ${attrs.color}`;
  return output;
}

export async function handleListCustomFieldOptions(
  input: ListCustomFieldOptionsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getCustomFieldOptions(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No custom field options found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "option");
    const lines = result.data.map((o) => formatOption(o));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve custom field options: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
