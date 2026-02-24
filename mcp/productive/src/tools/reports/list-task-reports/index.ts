import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListTaskReportsSchema, ListTaskReportsInput } from "./schema.js";
import { handleListTaskReports } from "./handler.js";

export class ListTaskReportsTool extends BaseTool<ListTaskReportsInput> {
  readonly name = "list_task_reports";
  readonly description = "Get aggregated task completion and status reports from Productive.io";
  readonly schema = ListTaskReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListTaskReportsInput): Promise<ToolResponse> {
    return handleListTaskReports(input, this.apiClient);
  }
}
