import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListWebhooksSchema, ListWebhooksInput } from "./schema.js";
import { handleListWebhooks } from "./handler.js";

export class ListWebhooksTool extends BaseTool<ListWebhooksInput> {
  readonly name = "list_webhooks";
  readonly description = "List configured webhooks in Productive.io";
  readonly schema = ListWebhooksSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListWebhooksInput): Promise<ToolResponse> {
    return handleListWebhooks(input, this.apiClient);
  }
}
