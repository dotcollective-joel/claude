import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetServiceSchema, GetServiceInput } from "./schema.js";
import { handleGetService } from "./handler.js";

export class GetServiceTool extends BaseTool<GetServiceInput> {
  readonly name = "get_service";
  readonly description = "Get a Productive.io service by ID or URL";
  readonly schema = GetServiceSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetServiceInput): Promise<ToolResponse> {
    return handleGetService(input, this.apiClient);
  }
}
