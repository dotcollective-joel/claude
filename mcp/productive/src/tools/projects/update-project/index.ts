import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { UpdateProjectSchema, UpdateProjectInput } from "./schema.js";
import { handleUpdateProject } from "./handler.js";

export class UpdateProjectTool extends BaseTool<UpdateProjectInput> {
  readonly name = "update_project";
  readonly description = "Update an existing project in Productive.io";
  readonly schema = UpdateProjectSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: UpdateProjectInput): Promise<ToolResponse> {
    return handleUpdateProject(input, this.apiClient);
  }
}
