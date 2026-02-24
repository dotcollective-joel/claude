import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListPurchaseOrdersSchema, ListPurchaseOrdersInput } from "./schema.js";
import { handleListPurchaseOrders } from "./handler.js";

export class ListPurchaseOrdersTool extends BaseTool<ListPurchaseOrdersInput> {
  readonly name = "list_purchase_orders";
  readonly description = "List purchase orders in Productive.io";
  readonly schema = ListPurchaseOrdersSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListPurchaseOrdersInput): Promise<ToolResponse> {
    return handleListPurchaseOrders(input, this.apiClient);
  }
}
