import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateTodoSchema, CreateTodoInput } from "./schema.js";
import { handleCreateTodo } from "./handler.js";

export class CreateTodoTool extends BaseTool<CreateTodoInput> {
  readonly name = "create_todo";
  readonly description = "Add a checklist item to a task in Productive.io";
  readonly schema = CreateTodoSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateTodoInput): Promise<ToolResponse> {
    return handleCreateTodo(input, this.apiClient);
  }
}
