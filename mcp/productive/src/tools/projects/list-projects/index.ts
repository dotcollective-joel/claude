import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListProjectsSchema, ListProjectsInput } from "./schema.js";
import { handleListProjects } from "./handler.js";

export class ListProjectsTool extends BaseTool<ListProjectsInput> {
  readonly name = "list_projects";
  readonly description = "List Productive.io projects with optional filters";
  readonly schema = ListProjectsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListProjectsInput): Promise<ToolResponse> {
    return handleListProjects(input, this.apiClient);
  }
}
