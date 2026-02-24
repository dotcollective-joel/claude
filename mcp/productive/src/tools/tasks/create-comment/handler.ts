import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateCommentInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";
import { formatDateTime } from "../../../utils/formatters.js";

export async function handleCreateComment(
  input: CreateCommentInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    if (!input.task_id && !input.deal_id) {
      return {
        content: [{ type: "text", text: "Either task_id or deal_id must be provided." }],
        isError: true,
      };
    }

    const relationships: Record<string, { type: string; id: string }> = {};
    if (input.task_id) {
      relationships.commentable = { type: "tasks", id: input.task_id };
    } else if (input.deal_id) {
      relationships.commentable = { type: "deals", id: input.deal_id };
    }

    const body = buildJsonApiBody(
      "comments",
      { content: input.content },
      relationships
    );

    const comment = await apiClient.createComment(body);

    let output = `Comment created successfully.\n\n`;
    output += `**ID:** ${comment.id}\n`;
    output += `**Content:** ${comment.attributes.content}\n`;
    output += `**Created:** ${formatDateTime(comment.attributes.created_at)}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create comment: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
