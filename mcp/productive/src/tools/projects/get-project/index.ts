import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetProjectSchema, GetProjectInput } from "./schema.js";
import { handleGetProject } from "./handler.js";

export class GetProjectTool extends BaseTool<GetProjectInput> {
  readonly name = "get_project";
  readonly description = "Get a Productive.io project by ID or URL";
  readonly schema = GetProjectSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetProjectInput): Promise<ToolResponse> {
    return handleGetProject(input, this.apiClient);
  }
}
