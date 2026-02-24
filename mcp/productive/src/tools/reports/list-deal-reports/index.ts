import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListDealReportsSchema, ListDealReportsInput } from "./schema.js";
import { handleListDealReports } from "./handler.js";

export class ListDealReportsTool extends BaseTool<ListDealReportsInput> {
  readonly name = "list_deal_reports";
  readonly description = "Get aggregated deal pipeline reports from Productive.io";
  readonly schema = ListDealReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListDealReportsInput): Promise<ToolResponse> {
    return handleListDealReports(input, this.apiClient);
  }
}
