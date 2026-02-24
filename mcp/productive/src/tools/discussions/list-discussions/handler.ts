import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListDiscussionsInput } from "./schema.js";
import { ProductiveDiscussion } from "../../../types/discussion.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatDiscussion(discussion: ProductiveDiscussion, included?: JsonApiResource[]): string {
  const attrs = discussion.attributes;
  const personName = resolveIncludedName(
    included, "people",
    discussion.relationships?.person?.data?.id,
    "Unknown"
  );

  let output = `**${attrs.title}** (ID: ${discussion.id})`;
  output += `\n  By: ${personName} | Created: ${formatDate(attrs.created_at)}`;
  if (attrs.body) {
    const preview = attrs.body.length > 100 ? attrs.body.substring(0, 100) + "..." : attrs.body;
    output += `\n  ${preview}`;
  }
  return output;
}

export async function handleListDiscussions(
  input: ListDiscussionsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getDiscussions(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No discussions found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "discussion");
    const lines = result.data.map((d) => formatDiscussion(d, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve discussions: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
