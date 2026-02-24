import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListContractsInput } from "./schema.js";
import { ProductiveContract } from "../../../types/contract.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate, formatCurrency } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatContract(contract: ProductiveContract, included?: JsonApiResource[]): string {
  const attrs = contract.attributes;
  const companyName = resolveIncludedName(
    included, "companies",
    contract.relationships?.company?.data?.id,
    "No company"
  );

  let output = `**${attrs.name}** (ID: ${contract.id})`;
  output += `\n  Company: ${companyName}`;
  if (attrs.number) output += ` | Number: ${attrs.number}`;
  if (attrs.starts_on) output += ` | Start: ${formatDate(attrs.starts_on)}`;
  if (attrs.ends_on) output += ` | End: ${formatDate(attrs.ends_on)}`;
  if (attrs.value) output += ` | Value: ${formatCurrency(attrs.value, attrs.currency || undefined)}`;
  if (attrs.recurring) output += ` | Recurring: ${attrs.recurring_period || "Yes"}`;
  return output;
}

export async function handleListContracts(
  input: ListContractsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getContracts(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No contracts found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "contract");
    const lines = result.data.map((c) => formatContract(c, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve contracts: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
