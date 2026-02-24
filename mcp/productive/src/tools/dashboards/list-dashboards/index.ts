import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListDashboardsSchema, ListDashboardsInput } from "./schema.js";
import { handleListDashboards } from "./handler.js";

export class ListDashboardsTool extends BaseTool<ListDashboardsInput> {
  readonly name = "list_dashboards";
  readonly description = "List dashboards in Productive.io";
  readonly schema = ListDashboardsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListDashboardsInput): Promise<ToolResponse> {
    return handleListDashboards(input, this.apiClient);
  }
}
