import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetCustomFieldInput } from "./schema.js";
import { formatDate } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

export async function handleGetCustomField(
  input: GetCustomFieldInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const response = await apiClient.getCustomField(input.custom_field_id);
    const field = response.data;
    const attrs = field.attributes;
    const included = response.included || [];

    let output = `# ${attrs.name}\n\n`;
    output += `**Custom Field ID:** ${field.id}\n`;
    output += `**Type:** ${attrs.field_type}\n`;
    output += `**Resource Type:** ${attrs.resource_type}\n`;
    output += `**Required:** ${attrs.required ? "Yes" : "No"}\n`;
    output += `**Position:** ${attrs.position}\n`;
    if (attrs.description) output += `**Description:** ${attrs.description}\n`;
    output += `**Created:** ${formatDate(attrs.created_at)}\n`;
    output += `**Updated:** ${formatDate(attrs.updated_at)}\n`;

    // List options from included
    const options = included
      .filter((r: JsonApiResource) => r.type === "custom_field_options")
      .sort((a: JsonApiResource, b: JsonApiResource) =>
        ((a.attributes?.position as number) || 0) - ((b.attributes?.position as number) || 0)
      );

    if (options.length > 0) {
      output += `\n## Options (${options.length})\n`;
      for (const option of options) {
        const value = option.attributes?.value || "Unnamed";
        const color = option.attributes?.color;
        let line = `- **${value}** (ID: ${option.id})`;
        if (color) line += ` | Color: ${color}`;
        output += `${line}\n`;
      }
    }

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve custom field: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
