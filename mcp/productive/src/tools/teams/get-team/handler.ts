import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetTeamInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";
import { formatDate } from "../../../utils/formatters.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { JsonApiResource } from "../../../types/common.types.js";

export async function handleGetTeam(
  input: GetTeamInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const id = resolveId(input.team_id, "teams");

    if (!id) {
      return {
        content: [{ type: "text", text: "Invalid team ID or URL format." }],
        isError: true,
      };
    }

    const response = await apiClient.getTeam(id);
    const team = response.data;
    const attrs = team.attributes;
    const included = response.included || [];

    let output = `# ${attrs.name}\n\n`;
    output += `**Team ID:** ${team.id}\n`;
    output += `**Created:** ${formatDate(attrs.created_at)}\n`;
    output += `**Updated:** ${formatDate(attrs.updated_at)}\n`;

    // List memberships from included
    const memberships = included.filter((r: JsonApiResource) => r.type === "memberships");
    if (memberships.length > 0) {
      output += `\n## Members (${memberships.length})\n`;
      for (const membership of memberships) {
        const role = membership.attributes?.role || "Member";
        const personData = membership.relationships?.person?.data;
        const personId = personData && !Array.isArray(personData) ? personData.id : undefined;
        const personName = resolveIncludedName(included, "people", personId, `Person ${personId || "unknown"}`);
        output += `- ${personName} — ${role}\n`;
      }
    }

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve team: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
