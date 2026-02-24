import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetCompanySchema, GetCompanyInput } from "./schema.js";
import { handleGetCompany } from "./handler.js";

export class GetCompanyTool extends BaseTool<GetCompanyInput> {
  readonly name = "get_company";
  readonly description = "Get a Productive.io company by ID or URL";
  readonly schema = GetCompanySchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetCompanyInput): Promise<ToolResponse> {
    return handleGetCompany(input, this.apiClient);
  }
}
