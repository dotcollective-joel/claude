import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListCompaniesSchema, ListCompaniesInput } from "./schema.js";
import { handleListCompanies } from "./handler.js";

export class ListCompaniesTool extends BaseTool<ListCompaniesInput> {
  readonly name = "list_companies";
  readonly description = "List Productive.io companies with optional filters";
  readonly schema = ListCompaniesSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListCompaniesInput): Promise<ToolResponse> {
    return handleListCompanies(input, this.apiClient);
  }
}
