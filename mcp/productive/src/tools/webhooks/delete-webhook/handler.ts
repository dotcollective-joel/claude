import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { DeleteWebhookInput } from "./schema.js";

export async function handleDeleteWebhook(
  input: DeleteWebhookInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    await apiClient.deleteWebhook(input.webhook_id);

    return {
      content: [{ type: "text", text: `Webhook ${input.webhook_id} deleted successfully.` }],
    };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to delete webhook: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
