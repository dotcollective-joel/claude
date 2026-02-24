import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListPurchaseOrdersInput } from "./schema.js";
import { ProductivePurchaseOrder } from "../../../types/purchase-order.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate, formatCurrency } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatPurchaseOrder(po: ProductivePurchaseOrder, included?: JsonApiResource[]): string {
  const attrs = po.attributes;
  const companyName = resolveIncludedName(
    included, "companies",
    po.relationships?.company?.data?.id,
    "No company"
  );

  let output = `**${attrs.title}** (ID: ${po.id})`;
  if (attrs.number) output += ` | #${attrs.number}`;
  output += `\n  Company: ${companyName}`;
  output += ` | Status: ${attrs.status}`;
  if (attrs.total) output += ` | Total: ${formatCurrency(attrs.total, attrs.currency || undefined)}`;
  if (attrs.date) output += ` | Date: ${formatDate(attrs.date)}`;
  if (attrs.due_date) output += ` | Due: ${formatDate(attrs.due_date)}`;
  return output;
}

export async function handleListPurchaseOrders(
  input: ListPurchaseOrdersInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getPurchaseOrders(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No purchase orders found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "purchase order");
    const lines = result.data.map((po) => formatPurchaseOrder(po, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve purchase orders: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
