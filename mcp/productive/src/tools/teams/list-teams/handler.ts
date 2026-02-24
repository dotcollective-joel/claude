import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListTeamsInput } from "./schema.js";
import { ProductiveTeam } from "../../../types/team.types.js";
import { formatCountSummary, formatDate } from "../../../utils/formatters.js";

function formatTeam(team: ProductiveTeam): string {
  const attrs = team.attributes;
  return `**${attrs.name}** (ID: ${team.id}) | Created: ${formatDate(attrs.created_at)}`;
}

export async function handleListTeams(
  input: ListTeamsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getTeams(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No teams found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "team");
    const lines = result.data.map((t) => formatTeam(t));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve teams: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
