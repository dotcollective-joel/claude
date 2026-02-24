import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListExpenseReportsSchema, ListExpenseReportsInput } from "./schema.js";
import { handleListExpenseReports } from "./handler.js";

export class ListExpenseReportsTool extends BaseTool<ListExpenseReportsInput> {
  readonly name = "list_expense_reports";
  readonly description = "Get aggregated expense summary reports from Productive.io";
  readonly schema = ListExpenseReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListExpenseReportsInput): Promise<ToolResponse> {
    return handleListExpenseReports(input, this.apiClient);
  }
}
