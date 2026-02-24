import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { UpdateTaskSchema, UpdateTaskInput } from "./schema.js";
import { handleUpdateTask } from "./handler.js";

export class UpdateTaskTool extends BaseTool<UpdateTaskInput> {
  readonly name = "update_task";
  readonly description = "Update an existing task in Productive.io";
  readonly schema = UpdateTaskSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: UpdateTaskInput): Promise<ToolResponse> {
    return handleUpdateTask(input, this.apiClient);
  }
}
