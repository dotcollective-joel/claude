import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ApproveExpenseInput } from "./schema.js";
import { buildJsonApiUpdateBody } from "../../../utils/jsonapi.js";
import { formatDate, formatCurrency } from "../../../utils/formatters.js";

export async function handleApproveExpense(
  input: ApproveExpenseInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const body = buildJsonApiUpdateBody("expenses", input.expense_id, {
      approved: true,
    });

    const expense = await apiClient.updateExpense(input.expense_id, body);
    const attrs = expense.attributes;

    let output = `Expense approved successfully.\n\n`;
    output += `**ID:** ${expense.id}\n`;
    output += `**Name:** ${attrs.name}\n`;
    output += `**Amount:** ${formatCurrency(attrs.amount, attrs.currency)}\n`;
    output += `**Date:** ${formatDate(attrs.date)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to approve expense: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
