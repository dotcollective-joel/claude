import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { DeleteWebhookSchema, DeleteWebhookInput } from "./schema.js";
import { handleDeleteWebhook } from "./handler.js";

export class DeleteWebhookTool extends BaseTool<DeleteWebhookInput> {
  readonly name = "delete_webhook";
  readonly description = "Delete a webhook from Productive.io";
  readonly schema = DeleteWebhookSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: DeleteWebhookInput): Promise<ToolResponse> {
    return handleDeleteWebhook(input, this.apiClient);
  }
}
