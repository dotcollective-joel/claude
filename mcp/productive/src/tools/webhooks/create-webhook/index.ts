import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateWebhookSchema, CreateWebhookInput } from "./schema.js";
import { handleCreateWebhook } from "./handler.js";

export class CreateWebhookTool extends BaseTool<CreateWebhookInput> {
  readonly name = "create_webhook";
  readonly description = "Create a new webhook in Productive.io";
  readonly schema = CreateWebhookSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateWebhookInput): Promise<ToolResponse> {
    return handleCreateWebhook(input, this.apiClient);
  }
}
