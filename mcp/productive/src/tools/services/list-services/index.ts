import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListServicesSchema, ListServicesInput } from "./schema.js";
import { handleListServices } from "./handler.js";

export class ListServicesTool extends BaseTool<ListServicesInput> {
  readonly name = "list_services";
  readonly description = "List services from Productive.io with optional filters";
  readonly schema = ListServicesSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListServicesInput): Promise<ToolResponse> {
    return handleListServices(input, this.apiClient);
  }
}
