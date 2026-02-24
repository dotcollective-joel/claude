import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateAttachmentInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleCreateAttachment(
  input: CreateAttachmentInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const attributes: Record<string, unknown> = {
      name: input.name,
    };

    if (input.url !== undefined) attributes.url = input.url;

    const relationships: Record<string, { type: string; id: string }> = {
      attachable: { type: input.attachable_type, id: input.attachable_id },
    };

    const body = buildJsonApiBody("attachments", attributes, relationships);
    const attachment = await apiClient.createAttachment(body);
    const attrs = attachment.attributes;

    let output = `Attachment created successfully.\n\n`;
    output += `**ID:** ${attachment.id}\n`;
    output += `**Name:** ${attrs.name}\n`;
    if (attrs.content_type) output += `**Type:** ${attrs.content_type}\n`;
    if (attrs.url) output += `**URL:** ${attrs.url}\n`;
    output += `**Created:** ${formatDate(attrs.created_at)}`;

    return { content: [{ type: "text", text: output }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create attachment: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
