import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListActivitiesSchema, ListActivitiesInput } from "./schema.js";
import { handleListActivities } from "./handler.js";

export class ListActivitiesTool extends BaseTool<ListActivitiesInput> {
  readonly name = "list_activities";
  readonly description = "List activity log entries from Productive.io";
  readonly schema = ListActivitiesSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListActivitiesInput): Promise<ToolResponse> {
    return handleListActivities(input, this.apiClient);
  }
}
