import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetWorkflowSchema, GetWorkflowInput } from "./schema.js";
import { handleGetWorkflow } from "./handler.js";

export class GetWorkflowTool extends BaseTool<GetWorkflowInput> {
  readonly name = "get_workflow";
  readonly description = "Get a workflow by ID or URL from Productive.io, including its statuses";
  readonly schema = GetWorkflowSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetWorkflowInput): Promise<ToolResponse> {
    return handleGetWorkflow(input, this.apiClient);
  }
}
