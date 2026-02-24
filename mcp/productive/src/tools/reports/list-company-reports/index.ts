import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListCompanyReportsSchema, ListCompanyReportsInput } from "./schema.js";
import { handleListCompanyReports } from "./handler.js";

export class ListCompanyReportsTool extends BaseTool<ListCompanyReportsInput> {
  readonly name = "list_company_reports";
  readonly description = "Get aggregated company-level reports from Productive.io";
  readonly schema = ListCompanyReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListCompanyReportsInput): Promise<ToolResponse> {
    return handleListCompanyReports(input, this.apiClient);
  }
}
