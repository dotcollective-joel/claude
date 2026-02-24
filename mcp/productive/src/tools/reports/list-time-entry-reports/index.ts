import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListTimeEntryReportsSchema, ListTimeEntryReportsInput } from "./schema.js";
import { handleListTimeEntryReports } from "./handler.js";

export class ListTimeEntryReportsTool extends BaseTool<ListTimeEntryReportsInput> {
  readonly name = "list_time_entry_reports";
  readonly description = "Get aggregated time entry reports from Productive.io with grouping and date range filters";
  readonly schema = ListTimeEntryReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListTimeEntryReportsInput): Promise<ToolResponse> {
    return handleListTimeEntryReports(input, this.apiClient);
  }
}
