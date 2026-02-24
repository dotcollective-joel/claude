import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { DeleteTaskSchema, DeleteTaskInput } from "./schema.js";
import { handleDeleteTask } from "./handler.js";

export class DeleteTaskTool extends BaseTool<DeleteTaskInput> {
  readonly name = "delete_task";
  readonly description = "Delete a task from Productive.io";
  readonly schema = DeleteTaskSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: DeleteTaskInput): Promise<ToolResponse> {
    return handleDeleteTask(input, this.apiClient);
  }
}
