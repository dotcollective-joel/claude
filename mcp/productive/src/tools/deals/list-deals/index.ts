import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListDealsSchema, ListDealsInput } from "./schema.js";
import { handleListDeals } from "./handler.js";

export class ListDealsTool extends BaseTool<ListDealsInput> {
  readonly name = "list_deals";
  readonly description = "List deals/budgets from Productive.io with optional filters";
  readonly schema = ListDealsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListDealsInput): Promise<ToolResponse> {
    return handleListDeals(input, this.apiClient);
  }
}
