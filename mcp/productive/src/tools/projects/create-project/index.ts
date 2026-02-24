import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateProjectSchema, CreateProjectInput } from "./schema.js";
import { handleCreateProject } from "./handler.js";

export class CreateProjectTool extends BaseTool<CreateProjectInput> {
  readonly name = "create_project";
  readonly description = "Create a new project in Productive.io";
  readonly schema = CreateProjectSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateProjectInput): Promise<ToolResponse> {
    return handleCreateProject(input, this.apiClient);
  }
}
