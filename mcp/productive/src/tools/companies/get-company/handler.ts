import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetCompanyInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleGetCompany(
  input: GetCompanyInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const companyId = resolveId(input.company_id, "companies");

    if (!companyId) {
      return {
        content: [{ type: "text", text: "Invalid company ID or URL format." }],
        isError: true,
      };
    }

    const company = await apiClient.getCompany(companyId);
    const attrs = company.attributes;

    let output = `# ${attrs.name}\n\n`;
    output += `**Company ID:** ${company.id}\n`;
    if (attrs.billing_name) output += `**Billing Name:** ${attrs.billing_name}\n`;
    if (attrs.company_code) output += `**Company Code:** ${attrs.company_code}\n`;
    if (attrs.vat) output += `**VAT:** ${attrs.vat}\n`;
    if (attrs.default_currency) output += `**Currency:** ${attrs.default_currency}\n`;
    if (attrs.domain) output += `**Domain:** ${attrs.domain}\n`;
    if (attrs.due_days) output += `**Payment Terms:** ${attrs.due_days} days\n`;
    output += `**Status:** ${attrs.status || "Active"}\n`;
    output += `**Created:** ${formatDate(attrs.created_at)}\n`;
    if (attrs.last_activity_at) output += `**Last Activity:** ${formatDate(attrs.last_activity_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve company: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
