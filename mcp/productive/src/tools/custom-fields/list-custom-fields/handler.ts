import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListCustomFieldsInput } from "./schema.js";
import { ProductiveCustomField } from "../../../types/custom-field.types.js";
import { formatCountSummary } from "../../../utils/formatters.js";

function formatCustomField(field: ProductiveCustomField): string {
  const attrs = field.attributes;
  let output = `**${attrs.name}** (ID: ${field.id})`;
  output += ` | Type: ${attrs.field_type}`;
  output += ` | For: ${attrs.resource_type}`;
  if (attrs.required) output += ` | Required`;
  if (attrs.description) output += ` | ${attrs.description}`;
  return output;
}

export async function handleListCustomFields(
  _input: ListCustomFieldsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getCustomFields();

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No custom fields found." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "custom field");
    const lines = result.data.map((f) => formatCustomField(f));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve custom fields: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
