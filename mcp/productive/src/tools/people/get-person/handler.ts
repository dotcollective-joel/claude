import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetPersonInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleGetPerson(
  input: GetPersonInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const personId = resolveId(input.person_id, "people");

    if (!personId) {
      return {
        content: [{ type: "text", text: "Invalid person ID or URL format." }],
        isError: true,
      };
    }

    const person = await apiClient.getPerson(personId);
    const attrs = person.attributes;

    let output = `# ${attrs.first_name} ${attrs.last_name}\n\n`;
    output += `**Person ID:** ${person.id}\n`;
    if (attrs.email) output += `**Email:** ${attrs.email}\n`;
    if (attrs.title) output += `**Title:** ${attrs.title}\n`;
    output += `**Status:** ${attrs.status || "Active"}\n`;
    if (attrs.joined_at) output += `**Joined:** ${formatDate(attrs.joined_at)}\n`;
    if (attrs.last_seen_at) output += `**Last Seen:** ${formatDate(attrs.last_seen_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve person: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
