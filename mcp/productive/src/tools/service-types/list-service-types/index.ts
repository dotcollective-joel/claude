import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListServiceTypesSchema, ListServiceTypesInput } from "./schema.js";
import { handleListServiceTypes } from "./handler.js";

export class ListServiceTypesTool extends BaseTool<ListServiceTypesInput> {
  readonly name = "list_service_types";
  readonly description = "List service types (configuration taxonomy) in Productive.io";
  readonly schema = ListServiceTypesSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListServiceTypesInput): Promise<ToolResponse> {
    return handleListServiceTypes(input, this.apiClient);
  }
}
