import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetDealSchema, GetDealInput } from "./schema.js";
import { handleGetDeal } from "./handler.js";

export class GetDealTool extends BaseTool<GetDealInput> {
  readonly name = "get_deal";
  readonly description = "Get a Productive.io deal/budget by ID or URL";
  readonly schema = GetDealSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetDealInput): Promise<ToolResponse> {
    return handleGetDeal(input, this.apiClient);
  }
}
