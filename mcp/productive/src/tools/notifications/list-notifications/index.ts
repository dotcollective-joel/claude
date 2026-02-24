import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListNotificationsSchema, ListNotificationsInput } from "./schema.js";
import { handleListNotifications } from "./handler.js";

export class ListNotificationsTool extends BaseTool<ListNotificationsInput> {
  readonly name = "list_notifications";
  readonly description = "List notifications in Productive.io";
  readonly schema = ListNotificationsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListNotificationsInput): Promise<ToolResponse> {
    return handleListNotifications(input, this.apiClient);
  }
}
