import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListProjectReportsSchema, ListProjectReportsInput } from "./schema.js";
import { handleListProjectReports } from "./handler.js";

export class ListProjectReportsTool extends BaseTool<ListProjectReportsInput> {
  readonly name = "list_project_reports";
  readonly description = "Get aggregated project health/status reports from Productive.io";
  readonly schema = ListProjectReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListProjectReportsInput): Promise<ToolResponse> {
    return handleListProjectReports(input, this.apiClient);
  }
}
