import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateTaskListSchema, CreateTaskListInput } from "./schema.js";
import { handleCreateTaskList } from "./handler.js";

export class CreateTaskListTool extends BaseTool<CreateTaskListInput> {
  readonly name = "create_task_list";
  readonly description = "Create a new task list in a Productive.io project";
  readonly schema = CreateTaskListSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateTaskListInput): Promise<ToolResponse> {
    return handleCreateTaskList(input, this.apiClient);
  }
}
