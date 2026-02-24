import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListExpenseReportsInput } from "./schema.js";
import { formatReportRow, getGroupLabel, ReportFieldConfig } from "../_shared/formatters.js";
import { formatCountSummary } from "../../../utils/formatters.js";
import { ExpenseReportAttributes } from "../../../types/report.types.js";

const FIELDS: ReportFieldConfig[] = [
  { key: "_group", label: "Group", type: "string" },
  { key: "count", label: "Expenses", type: "count" },
  { key: "total_amount", label: "Total", type: "currency" },
  { key: "total_billable_amount", label: "Billable", type: "currency" },
];

export async function handleListExpenseReports(
  input: ListExpenseReportsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getExpenseReports(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No expense report data found for the specified filters." }] };
    }

    const header = formatCountSummary(result.data.length, "row");
    const lines = result.data.map((row) => {
      const attrs = row.attributes as ExpenseReportAttributes & Record<string, unknown>;
      attrs._group = getGroupLabel(attrs);
      return formatReportRow(attrs, FIELDS, attrs.currency);
    });

    return { content: [{ type: "text", text: `# Expense Report\n${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve expense reports: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
