import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListTimeEntryReportsInput } from "./schema.js";
import { formatReportRow, getGroupLabel, ReportFieldConfig } from "../_shared/formatters.js";
import { formatCountSummary } from "../../../utils/formatters.js";
import { TimeEntryReportAttributes } from "../../../types/report.types.js";

const FIELDS: ReportFieldConfig[] = [
  { key: "_group", label: "Group", type: "string" },
  { key: "count", label: "Entries", type: "count" },
  { key: "time", label: "Time", type: "minutes" },
  { key: "billable_time", label: "Billable", type: "minutes" },
  { key: "total_revenue", label: "Revenue", type: "currency" },
  { key: "total_cost", label: "Cost", type: "currency" },
  { key: "total_profit", label: "Profit", type: "currency" },
];

export async function handleListTimeEntryReports(
  input: ListTimeEntryReportsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getTimeEntryReports(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No time entry report data found for the specified filters." }] };
    }

    const header = formatCountSummary(result.data.length, "row");
    const lines = result.data.map((row) => {
      const attrs = row.attributes as TimeEntryReportAttributes & Record<string, unknown>;
      attrs._group = getGroupLabel(attrs);
      return formatReportRow(attrs, FIELDS, attrs.currency);
    });

    return { content: [{ type: "text", text: `# Time Entry Report\n${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve time entry reports: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
