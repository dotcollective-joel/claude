import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListPeopleInput } from "./schema.js";
import { ProductivePerson } from "../../../types/person.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatPerson(person: ProductivePerson, included?: JsonApiResource[]): string {
  const attrs = person.attributes;
  const companyName = resolveIncludedName(
    included, "companies",
    person.relationships?.company?.data?.id,
    "No company"
  );

  let output = `- **${attrs.first_name} ${attrs.last_name}** (ID: ${person.id})`;
  if (attrs.email) output += `\n  Email: ${attrs.email}`;
  if (attrs.title) output += ` | Title: ${attrs.title}`;
  output += ` | Company: ${companyName}`;
  return output;
}

export async function handleListPeople(
  input: ListPeopleInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getPeople(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No people found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "person", "people");
    const lines = result.data.map((p) => formatPerson(p, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve people: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
