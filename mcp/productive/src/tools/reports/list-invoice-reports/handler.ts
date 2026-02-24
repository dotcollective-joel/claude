import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListInvoiceReportsInput } from "./schema.js";
import { formatReportRow, getGroupLabel, ReportFieldConfig } from "../_shared/formatters.js";
import { formatCountSummary } from "../../../utils/formatters.js";
import { InvoiceReportAttributes } from "../../../types/report.types.js";

const FIELDS: ReportFieldConfig[] = [
  { key: "_group", label: "Group", type: "string" },
  { key: "count", label: "Invoices", type: "count" },
  { key: "total_amount", label: "Amount", type: "currency" },
  { key: "total_amount_with_tax", label: "With Tax", type: "currency" },
  { key: "total_amount_paid", label: "Paid", type: "currency" },
  { key: "total_amount_unpaid", label: "Unpaid", type: "currency" },
];

export async function handleListInvoiceReports(
  input: ListInvoiceReportsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getInvoiceReports(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No invoice report data found for the specified filters." }] };
    }

    const header = formatCountSummary(result.data.length, "row");
    const lines = result.data.map((row) => {
      const attrs = row.attributes as InvoiceReportAttributes & Record<string, unknown>;
      attrs._group = getGroupLabel(attrs);
      return formatReportRow(attrs, FIELDS, attrs.currency);
    });

    return { content: [{ type: "text", text: `# Invoice Report\n${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve invoice reports: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
