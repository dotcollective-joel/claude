import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListBudgetReportsSchema, ListBudgetReportsInput } from "./schema.js";
import { handleListBudgetReports } from "./handler.js";

export class ListBudgetReportsTool extends BaseTool<ListBudgetReportsInput> {
  readonly name = "list_budget_reports";
  readonly description = "Get aggregated budget utilization reports from Productive.io";
  readonly schema = ListBudgetReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListBudgetReportsInput): Promise<ToolResponse> {
    return handleListBudgetReports(input, this.apiClient);
  }
}
