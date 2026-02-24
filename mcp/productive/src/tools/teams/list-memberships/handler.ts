import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListMembershipsInput } from "./schema.js";
import { ProductiveMembership } from "../../../types/team.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatMembership(membership: ProductiveMembership, included?: JsonApiResource[]): string {
  const attrs = membership.attributes;
  const personName = resolveIncludedName(
    included, "people",
    membership.relationships?.person?.data?.id,
    "Unknown person"
  );
  const teamName = resolveIncludedName(
    included, "teams",
    membership.relationships?.team?.data?.id,
    "Unknown team"
  );

  let output = `**${personName}** → ${teamName}`;
  if (attrs.role) output += ` | Role: ${attrs.role}`;
  output += ` | Since: ${formatDate(attrs.created_at)}`;
  return output;
}

export async function handleListMemberships(
  input: ListMembershipsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getMemberships(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No memberships found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "membership");
    const lines = result.data.map((m) => formatMembership(m, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve memberships: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
