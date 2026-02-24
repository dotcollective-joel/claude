import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListWorkflowStatusesSchema, ListWorkflowStatusesInput } from "./schema.js";
import { handleListWorkflowStatuses } from "./handler.js";

export class ListWorkflowStatusesTool extends BaseTool<ListWorkflowStatusesInput> {
  readonly name = "list_workflow_statuses";
  readonly description = "List workflow statuses in Productive.io with optional workflow filter";
  readonly schema = ListWorkflowStatusesSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListWorkflowStatusesInput): Promise<ToolResponse> {
    return handleListWorkflowStatuses(input, this.apiClient);
  }
}
