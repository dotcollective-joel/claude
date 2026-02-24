import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { UpdateTodoSchema, UpdateTodoInput } from "./schema.js";
import { handleUpdateTodo } from "./handler.js";

export class UpdateTodoTool extends BaseTool<UpdateTodoInput> {
  readonly name = "update_todo";
  readonly description = "Update a checklist item on a task in Productive.io";
  readonly schema = UpdateTodoSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: UpdateTodoInput): Promise<ToolResponse> {
    return handleUpdateTodo(input, this.apiClient);
  }
}
