import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListDealReportsInput } from "./schema.js";
import { formatReportRow, getGroupLabel, ReportFieldConfig } from "../_shared/formatters.js";
import { formatCountSummary } from "../../../utils/formatters.js";
import { DealReportAttributes } from "../../../types/report.types.js";

const FIELDS: ReportFieldConfig[] = [
  { key: "_group", label: "Group", type: "string" },
  { key: "count", label: "Deals", type: "count" },
  { key: "total_revenue", label: "Revenue", type: "currency" },
  { key: "total_cost", label: "Cost", type: "currency" },
  { key: "total_profit", label: "Profit", type: "currency" },
  { key: "probability", label: "Probability", type: "percentage" },
];

export async function handleListDealReports(
  input: ListDealReportsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getDealReports(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No deal report data found for the specified filters." }] };
    }

    const header = formatCountSummary(result.data.length, "row");
    const lines = result.data.map((row) => {
      const attrs = row.attributes as DealReportAttributes & Record<string, unknown>;
      attrs._group = getGroupLabel(attrs);
      return formatReportRow(attrs, FIELDS);
    });

    return { content: [{ type: "text", text: `# Deal Report\n${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve deal reports: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
