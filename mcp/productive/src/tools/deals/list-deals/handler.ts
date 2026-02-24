import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListDealsInput } from "./schema.js";
import { ProductiveDeal } from "../../../types/deal.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatCurrency } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatDeal(deal: ProductiveDeal, included?: JsonApiResource[]): string {
  const attrs = deal.attributes;
  const companyName = resolveIncludedName(
    included, "companies",
    deal.relationships?.company?.data?.id,
    "No company"
  );

  let output = `**${attrs.name}** (ID: ${deal.id})\n`;
  output += `  Company: ${companyName}`;
  output += ` | Status: ${attrs.status}`;
  output += ` | Budget: ${formatCurrency(attrs.budget_total, attrs.currency)}`;
  output += ` | Used: ${formatCurrency(attrs.budget_used, attrs.currency)}`;
  if (attrs.profit) output += ` | Profit: ${formatCurrency(attrs.profit, attrs.currency)}`;
  return output;
}

export async function handleListDeals(
  input: ListDealsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getDeals(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No deals found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "deal");
    const lines = result.data.map((d) => formatDeal(d, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve deals: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
