import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListProjectReportsInput } from "./schema.js";
import { formatReportRow, getGroupLabel, ReportFieldConfig } from "../_shared/formatters.js";
import { formatCountSummary } from "../../../utils/formatters.js";
import { ProjectReportAttributes } from "../../../types/report.types.js";

const FIELDS: ReportFieldConfig[] = [
  { key: "_group", label: "Group", type: "string" },
  { key: "count", label: "Projects", type: "count" },
];

export async function handleListProjectReports(
  input: ListProjectReportsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getProjectReports(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No project report data found for the specified filters." }] };
    }

    const header = formatCountSummary(result.data.length, "row");
    const lines = result.data.map((row) => {
      const attrs = row.attributes as ProjectReportAttributes & Record<string, unknown>;
      attrs._group = getGroupLabel(attrs);
      return formatReportRow(attrs, FIELDS);
    });

    return { content: [{ type: "text", text: `# Project Report\n${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve project reports: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
