import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetDealInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";
import { formatDate, formatCurrency, formatMinutes } from "../../../utils/formatters.js";

export async function handleGetDeal(
  input: GetDealInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const id = resolveId(input.deal_id, "deals");

    if (!id) {
      return {
        content: [{ type: "text", text: "Invalid deal ID or URL format." }],
        isError: true,
      };
    }

    const deal = await apiClient.getDeal(id);
    const attrs = deal.attributes;

    let output = `# ${attrs.name}\n\n`;
    output += `**Deal ID:** ${deal.id}\n`;
    output += `**Number:** ${attrs.number}\n`;
    output += `**Status:** ${attrs.status}\n`;
    output += `**Currency:** ${attrs.currency}\n`;
    if (attrs.date) output += `**Date:** ${formatDate(attrs.date)}\n`;
    if (attrs.closed_at) output += `**Closed At:** ${formatDate(attrs.closed_at)}\n`;
    if (attrs.probability !== null) output += `**Probability:** ${attrs.probability}%\n`;

    output += `\n## Budget\n`;
    output += `**Budget Total:** ${formatCurrency(attrs.budget_total, attrs.currency)}\n`;
    output += `**Budget Used:** ${formatCurrency(attrs.budget_used, attrs.currency)}\n`;
    output += `**Budget Remaining:** ${formatCurrency(attrs.budget_remaining, attrs.currency)}\n`;

    output += `\n## Financials\n`;
    output += `**Revenue:** ${formatCurrency(attrs.revenue, attrs.currency)}\n`;
    output += `**Cost:** ${formatCurrency(attrs.cost, attrs.currency)}\n`;
    output += `**Profit:** ${formatCurrency(attrs.profit, attrs.currency)}\n`;

    output += `\n## Time\n`;
    if (attrs.worked_time !== null) output += `**Worked Time:** ${formatMinutes(attrs.worked_time)}\n`;
    if (attrs.billable_time !== null) output += `**Billable Time:** ${formatMinutes(attrs.billable_time)}\n`;
    if (attrs.budgeted_time !== null) output += `**Budgeted Time:** ${formatMinutes(attrs.budgeted_time)}\n`;

    output += `\n**Created:** ${formatDate(attrs.created_at)}\n`;
    if (attrs.last_activity_at) output += `**Last Activity:** ${formatDate(attrs.last_activity_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve deal: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
