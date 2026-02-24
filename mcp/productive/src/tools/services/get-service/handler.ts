import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetServiceInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";
import { formatCurrency, formatMinutes, formatDate } from "../../../utils/formatters.js";

export async function handleGetService(
  input: GetServiceInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const id = resolveId(input.service_id, "services");

    if (!id) {
      return {
        content: [{ type: "text", text: "Invalid service ID or URL format." }],
        isError: true,
      };
    }

    const service = await apiClient.getService(id);
    const attrs = service.attributes;

    let output = `# ${attrs.name}\n\n`;
    output += `**Service ID:** ${service.id}\n`;
    if (attrs.description) output += `**Description:** ${attrs.description}\n`;
    if (attrs.price) output += `**Price:** ${formatCurrency(attrs.price, attrs.currency || undefined)}\n`;
    if (attrs.quantity) output += `**Quantity:** ${attrs.quantity}\n`;

    output += `\n## Tracking\n`;
    output += `**Time Tracking:** ${attrs.time_tracking_enabled ? "Enabled" : "Disabled"}\n`;
    output += `**Booking Tracking:** ${attrs.booking_tracking_enabled ? "Enabled" : "Disabled"}\n`;
    output += `**Expense Tracking:** ${attrs.expense_tracking_enabled ? "Enabled" : "Disabled"}\n`;

    output += `\n## Usage\n`;
    if (attrs.worked_time !== null) output += `**Worked Time:** ${formatMinutes(attrs.worked_time)}\n`;
    if (attrs.billable_time !== null) output += `**Billable Time:** ${formatMinutes(attrs.billable_time)}\n`;
    output += `**Revenue:** ${formatCurrency(attrs.revenue, attrs.currency || undefined)}\n`;
    output += `**Budget Used:** ${formatCurrency(attrs.budget_used, attrs.currency || undefined)}\n`;

    output += `\n**Created:** ${formatDate(attrs.created_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve service: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
