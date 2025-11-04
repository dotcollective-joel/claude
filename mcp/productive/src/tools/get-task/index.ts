/**
 * Get Task Tool
 * Retrieves a single task from Productive.io by URL
 */

import { BaseTool } from "../base/BaseTool.js";
import { ProductiveApiClient } from "../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../types/tool.types.js";
import { GetTaskSchema, GetTaskInput } from "./schema.js";
import { handleGetTask } from "./handler.js";

export class GetTaskTool extends BaseTool<GetTaskInput> {
  readonly name = "get_task";
  readonly description = "Get Productive.io Task";
  readonly schema = GetTaskSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetTaskInput): Promise<ToolResponse> {
    return handleGetTask(input, this.apiClient);
  }
}
