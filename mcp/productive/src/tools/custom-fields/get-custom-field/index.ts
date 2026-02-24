import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetCustomFieldSchema, GetCustomFieldInput } from "./schema.js";
import { handleGetCustomField } from "./handler.js";

export class GetCustomFieldTool extends BaseTool<GetCustomFieldInput> {
  readonly name = "get_custom_field";
  readonly description = "Get a custom field by ID from Productive.io, including its options";
  readonly schema = GetCustomFieldSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetCustomFieldInput): Promise<ToolResponse> {
    return handleGetCustomField(input, this.apiClient);
  }
}
