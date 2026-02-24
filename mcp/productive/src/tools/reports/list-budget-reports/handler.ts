import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListBudgetReportsInput } from "./schema.js";
import { formatReportRow, getGroupLabel, ReportFieldConfig } from "../_shared/formatters.js";
import { formatCountSummary } from "../../../utils/formatters.js";
import { BudgetReportAttributes } from "../../../types/report.types.js";

const FIELDS: ReportFieldConfig[] = [
  { key: "_group", label: "Group", type: "string" },
  { key: "count", label: "Budgets", type: "count" },
  { key: "total_budget_total", label: "Budget", type: "currency" },
  { key: "total_budget_used", label: "Used", type: "currency" },
  { key: "total_budget_remaining", label: "Remaining", type: "currency" },
  { key: "total_revenue", label: "Revenue", type: "currency" },
  { key: "total_profit", label: "Profit", type: "currency" },
  { key: "total_worked_time", label: "Worked", type: "minutes" },
];

export async function handleListBudgetReports(
  input: ListBudgetReportsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getBudgetReports(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No budget report data found for the specified filters." }] };
    }

    const header = formatCountSummary(result.data.length, "row");
    const lines = result.data.map((row) => {
      const attrs = row.attributes as BudgetReportAttributes & Record<string, unknown>;
      attrs._group = getGroupLabel(attrs);
      return formatReportRow(attrs, FIELDS, attrs.currency);
    });

    return { content: [{ type: "text", text: `# Budget Report\n${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve budget reports: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
