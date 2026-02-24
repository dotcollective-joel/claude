import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListActivitiesInput } from "./schema.js";
import { ProductiveActivity } from "../../../types/activity.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDateTime } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatActivity(activity: ProductiveActivity, included?: JsonApiResource[]): string {
  const attrs = activity.attributes;
  const personName = resolveIncludedName(
    included, "people",
    activity.relationships?.person?.data?.id,
    "Unknown"
  );

  const subject = attrs.subject_title || attrs.subject_type || "Unknown";
  return `- **${personName}** ${attrs.action} ${attrs.subject_type} "${subject}" — ${formatDateTime(attrs.created_at)}`;
}

export async function handleListActivities(
  input: ListActivitiesInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getActivities(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No activities found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "activity", "activities");
    const lines = result.data.map((a) => formatActivity(a, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve activities: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
