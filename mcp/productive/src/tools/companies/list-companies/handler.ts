import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListCompaniesInput } from "./schema.js";
import { ProductiveCompany } from "../../../types/company.types.js";
import { formatCountSummary, formatDate } from "../../../utils/formatters.js";

function formatCompany(company: ProductiveCompany): string {
  const attrs = company.attributes;
  let output = `- **${attrs.name}** (ID: ${company.id})`;
  if (attrs.company_code) output += ` | Code: ${attrs.company_code}`;
  if (attrs.default_currency) output += ` | Currency: ${attrs.default_currency}`;
  output += ` | Status: ${attrs.status || "Active"}`;
  if (attrs.last_activity_at) output += ` | Last Activity: ${formatDate(attrs.last_activity_at)}`;
  return output;
}

export async function handleListCompanies(
  input: ListCompaniesInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getCompanies(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No companies found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "company", "companies");
    const lines = result.data.map(formatCompany);

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve companies: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
