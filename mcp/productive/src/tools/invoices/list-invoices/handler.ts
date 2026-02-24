import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListInvoicesInput } from "./schema.js";
import { ProductiveInvoice } from "../../../types/invoice.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate, formatCurrency } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatInvoice(invoice: ProductiveInvoice, included?: JsonApiResource[]): string {
  const attrs = invoice.attributes;
  const companyName = resolveIncludedName(
    included, "companies",
    invoice.relationships?.company?.data?.id,
    "No company"
  );

  let output = `**Invoice ${attrs.number || "(no number)"}** (ID: ${invoice.id})\n`;
  output += `  Company: ${companyName}`;
  output += ` | ${formatCurrency(attrs.amount_with_tax, attrs.currency)}`;
  output += ` | State: ${attrs.invoice_state}`;
  output += ` | Payment: ${attrs.payment_status}`;
  output += ` | Invoiced: ${formatDate(attrs.invoiced_on)}`;
  return output;
}

export async function handleListInvoices(
  input: ListInvoicesInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getInvoices(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No invoices found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "invoice");
    const lines = result.data.map((i) => formatInvoice(i, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve invoices: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
