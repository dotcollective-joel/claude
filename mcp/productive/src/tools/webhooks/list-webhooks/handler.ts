import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListWebhooksInput } from "./schema.js";
import { ProductiveWebhook } from "../../../types/webhook.types.js";
import { formatCountSummary, formatDate } from "../../../utils/formatters.js";

const STATE_LABELS: Record<number, string> = { 1: "Working", 2: "Issues", 3: "Waiting" };
const TYPE_LABELS: Record<number, string> = { 1: "Webhook", 2: "Zapier" };

function formatWebhook(webhook: ProductiveWebhook): string {
  const attrs = webhook.attributes;
  let output = `**${attrs.name || "Unnamed"}** (ID: ${webhook.id})`;
  output += `\n  URL: ${attrs.target_url}`;
  output += ` | Event: ${attrs.event_id}`;
  output += ` | State: ${STATE_LABELS[attrs.state_id] || String(attrs.state_id)}`;
  output += ` | Type: ${TYPE_LABELS[attrs.type_id] || String(attrs.type_id)}`;
  output += ` | Created: ${formatDate(attrs.created_at)}`;
  return output;
}

export async function handleListWebhooks(
  input: ListWebhooksInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getWebhooks(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No webhooks found." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "webhook");
    const lines = result.data.map((w) => formatWebhook(w));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve webhooks: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
