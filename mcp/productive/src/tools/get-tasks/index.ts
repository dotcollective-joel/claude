/**
 * Get Tasks Tool
 * Retrieves multiple tasks from Productive.io with optional filters
 */

import { BaseTool } from "../base/BaseTool.js";
import { ProductiveApiClient } from "../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../types/tool.types.js";
import { getConfig } from "../../config/index.js";
import { TaskStatus } from "../../types/productive.types.js";
import { GetTasksSchema, GetTasksInput } from "./schema.js";
import { handleGetTasks } from "./handler.js";

export class GetTasksTool extends BaseTool<GetTasksInput> {
  readonly name = "get_tasks";
  readonly description = "Get Productive.io Tasks";
  readonly schema = GetTasksSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetTasksInput): Promise<ToolResponse> {
    // If no filters provided, use default user ID from config
    const filters = {
      assignee_id: input.assignee_id || getConfig().productive.userId,
      status: input.status !== undefined ? input.status : TaskStatus.Open,
      project_id: input.project_id,
    };

    return handleGetTasks(
      filters,
      this.apiClient,
      input.format || 'text',
      input.only_due_today_or_overdue || false
    );
  }
}
