import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListPaymentsInput } from "./schema.js";
import { ProductivePayment } from "../../../types/payment.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate, formatCurrency } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatPayment(payment: ProductivePayment, included?: JsonApiResource[]): string {
  const attrs = payment.attributes;
  const companyName = resolveIncludedName(
    included, "companies",
    payment.relationships?.company?.data?.id,
    "No company"
  );

  let output = `**${formatCurrency(attrs.amount, attrs.currency)}** (ID: ${payment.id})`;
  output += `\n  Company: ${companyName}`;
  output += ` | Date: ${formatDate(attrs.date)}`;
  output += ` | Status: ${attrs.status}`;
  if (attrs.note) output += `\n  Note: ${attrs.note}`;
  return output;
}

export async function handleListPayments(
  input: ListPaymentsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getPayments(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No payments found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "payment");
    const lines = result.data.map((p) => formatPayment(p, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve payments: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
