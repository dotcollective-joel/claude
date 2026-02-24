import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateDiscussionInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleCreateDiscussion(
  input: CreateDiscussionInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const attributes: Record<string, unknown> = {
      title: input.title,
      body: input.body || null,
    };

    const relationships: Record<string, { type: string; id: string }> = {};
    if (input.task_id) relationships.task = { type: "tasks", id: input.task_id };
    if (input.deal_id) relationships.deal = { type: "deals", id: input.deal_id };
    if (input.project_id) relationships.project = { type: "projects", id: input.project_id };

    const body = buildJsonApiBody(
      "discussions",
      attributes,
      Object.keys(relationships).length > 0 ? relationships : undefined
    );

    const discussion = await apiClient.createDiscussion(body);
    const attrs = discussion.attributes;

    let output = `Discussion created successfully.\n\n`;
    output += `**ID:** ${discussion.id}\n`;
    output += `**Title:** ${attrs.title}\n`;
    if (attrs.body) output += `**Body:** ${attrs.body}\n`;
    output += `**Created:** ${formatDate(attrs.created_at)}`;

    return { content: [{ type: "text", text: output }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create discussion: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
