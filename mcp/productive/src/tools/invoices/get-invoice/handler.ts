import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetInvoiceInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";
import { formatDate, formatCurrency } from "../../../utils/formatters.js";

export async function handleGetInvoice(
  input: GetInvoiceInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const id = resolveId(input.invoice_id, "invoices");

    if (!id) {
      return {
        content: [{ type: "text", text: "Invalid invoice ID or URL format." }],
        isError: true,
      };
    }

    const invoice = await apiClient.getInvoice(id);
    const attrs = invoice.attributes;

    let output = `# Invoice ${attrs.number || "(no number)"}\n\n`;
    output += `**Invoice ID:** ${invoice.id}\n`;
    if (attrs.subject) output += `**Subject:** ${attrs.subject}\n`;
    output += `**State:** ${attrs.invoice_state}\n`;
    output += `**Status:** ${attrs.invoice_status}\n`;
    output += `**Payment Status:** ${attrs.payment_status}\n`;
    output += `**Sent Status:** ${attrs.sent_status}\n`;
    output += `**Currency:** ${attrs.currency}\n`;

    output += `\n## Dates\n`;
    output += `**Invoiced On:** ${formatDate(attrs.invoiced_on)}\n`;
    if (attrs.sent_on) output += `**Sent On:** ${formatDate(attrs.sent_on)}\n`;
    if (attrs.pay_on) output += `**Pay On:** ${formatDate(attrs.pay_on)}\n`;
    if (attrs.paid_on) output += `**Paid On:** ${formatDate(attrs.paid_on)}\n`;

    output += `\n## Amounts\n`;
    output += `**Amount:** ${formatCurrency(attrs.amount, attrs.currency)}\n`;
    output += `**Tax:** ${formatCurrency(attrs.amount_tax, attrs.currency)}\n`;
    output += `**Total (with tax):** ${formatCurrency(attrs.amount_with_tax, attrs.currency)}\n`;
    output += `**Paid:** ${formatCurrency(attrs.amount_paid, attrs.currency)}\n`;
    output += `**Unpaid:** ${formatCurrency(attrs.amount_unpaid, attrs.currency)}\n`;

    if (attrs.tag_list.length > 0) output += `\n**Tags:** ${attrs.tag_list.join(", ")}\n`;
    output += `\n**Created:** ${formatDate(attrs.created_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve invoice: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
