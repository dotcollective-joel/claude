import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateWebhookInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";
import { formatDate } from "../../../utils/formatters.js";

export async function handleCreateWebhook(
  input: CreateWebhookInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const attributes: Record<string, unknown> = {
      target_url: input.target_url,
      event_id: input.event_id,
    };

    if (input.name !== undefined) attributes.name = input.name;
    if (input.type_id !== undefined) attributes.type_id = input.type_id;
    if (input.custom_headers !== undefined) attributes.custom_headers = input.custom_headers;

    const body = buildJsonApiBody("webhooks", attributes);
    const webhook = await apiClient.createWebhook(body);
    const attrs = webhook.attributes;

    let output = `Webhook created successfully.\n\n`;
    output += `**ID:** ${webhook.id}\n`;
    output += `**Name:** ${attrs.name || "Unnamed"}\n`;
    output += `**URL:** ${attrs.target_url}\n`;
    output += `**Event ID:** ${attrs.event_id}\n`;
    output += `**Created:** ${formatDate(attrs.created_at)}`;

    return { content: [{ type: "text", text: output }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create webhook: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
