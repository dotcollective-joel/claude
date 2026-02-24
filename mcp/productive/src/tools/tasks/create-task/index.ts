import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateTaskSchema, CreateTaskInput } from "./schema.js";
import { handleCreateTask } from "./handler.js";

export class CreateTaskTool extends BaseTool<CreateTaskInput> {
  readonly name = "create_task";
  readonly description = "Create a new task in Productive.io";
  readonly schema = CreateTaskSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateTaskInput): Promise<ToolResponse> {
    return handleCreateTask(input, this.apiClient);
  }
}
