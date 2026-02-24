import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateSubtaskSchema, CreateSubtaskInput } from "./schema.js";
import { handleCreateSubtask } from "./handler.js";

export class CreateSubtaskTool extends BaseTool<CreateSubtaskInput> {
  readonly name = "create_subtask";
  readonly description = "Create a subtask under a parent task in Productive.io";
  readonly schema = CreateSubtaskSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateSubtaskInput): Promise<ToolResponse> {
    return handleCreateSubtask(input, this.apiClient);
  }
}
