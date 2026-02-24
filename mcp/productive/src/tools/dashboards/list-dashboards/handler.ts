import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListDashboardsInput } from "./schema.js";
import { ProductiveDashboard } from "../../../types/dashboard.types.js";
import { formatCountSummary, formatDate } from "../../../utils/formatters.js";

function formatDashboard(dashboard: ProductiveDashboard): string {
  const attrs = dashboard.attributes;
  return `**${attrs.name}** (ID: ${dashboard.id}) | Created: ${formatDate(attrs.created_at)}`;
}

export async function handleListDashboards(
  _input: ListDashboardsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getDashboards();

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No dashboards found." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "dashboard");
    const lines = result.data.map((d) => formatDashboard(d));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve dashboards: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
