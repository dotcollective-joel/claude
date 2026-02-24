import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListWorkflowsSchema, ListWorkflowsInput } from "./schema.js";
import { handleListWorkflows } from "./handler.js";

export class ListWorkflowsTool extends BaseTool<ListWorkflowsInput> {
  readonly name = "list_workflows";
  readonly description = "List workflows in Productive.io with optional name and archived filters";
  readonly schema = ListWorkflowsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListWorkflowsInput): Promise<ToolResponse> {
    return handleListWorkflows(input, this.apiClient);
  }
}
