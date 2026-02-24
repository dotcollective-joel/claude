import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListTaskListsSchema, ListTaskListsInput } from "./schema.js";
import { handleListTaskLists } from "./handler.js";

export class ListTaskListsTool extends BaseTool<ListTaskListsInput> {
  readonly name = "list_task_lists";
  readonly description = "List task lists in a Productive.io project or board";
  readonly schema = ListTaskListsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListTaskListsInput): Promise<ToolResponse> {
    return handleListTaskLists(input, this.apiClient);
  }
}
