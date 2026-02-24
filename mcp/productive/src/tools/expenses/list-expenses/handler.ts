import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListExpensesInput } from "./schema.js";
import { ProductiveExpense } from "../../../types/expense.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate, formatCurrency } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatExpense(expense: ProductiveExpense, included?: JsonApiResource[]): string {
  const attrs = expense.attributes;
  const personName = resolveIncludedName(
    included, "people",
    expense.relationships?.person?.data?.id,
    "Unknown"
  );
  const serviceName = resolveIncludedName(
    included, "services",
    expense.relationships?.service?.data?.id,
    "No service"
  );

  let output = `**${attrs.name}** — ${formatCurrency(attrs.amount, attrs.currency)} on ${formatDate(attrs.date)}\n`;
  output += `  Person: ${personName}`;
  output += ` | Service: ${serviceName}`;
  output += ` | Approved: ${attrs.approved ? "Yes" : "No"}`;
  if (attrs.invoiced) output += ` | Invoiced`;
  if (attrs.reimbursable) output += ` | Reimbursable`;
  return output;
}

export async function handleListExpenses(
  input: ListExpensesInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getExpenses(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No expenses found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "expense");
    const lines = result.data.map((e) => formatExpense(e, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve expenses: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
