import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListBillsInput } from "./schema.js";
import { ProductiveBill } from "../../../types/bill.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate, formatCurrency } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatBill(bill: ProductiveBill, included?: JsonApiResource[]): string {
  const attrs = bill.attributes;
  const companyName = resolveIncludedName(
    included, "companies",
    bill.relationships?.company?.data?.id,
    "No company"
  );

  let output = `**Bill${attrs.number ? ` #${attrs.number}` : ""}** (ID: ${bill.id})`;
  output += `\n  Company: ${companyName}`;
  output += ` | Status: ${attrs.status}`;
  if (attrs.total) output += ` | Total: ${formatCurrency(attrs.total, attrs.currency || undefined)}`;
  if (attrs.date) output += ` | Date: ${formatDate(attrs.date)}`;
  if (attrs.due_date) output += ` | Due: ${formatDate(attrs.due_date)}`;
  return output;
}

export async function handleListBills(
  input: ListBillsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getBills(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No bills found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "bill");
    const lines = result.data.map((b) => formatBill(b, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve bills: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
