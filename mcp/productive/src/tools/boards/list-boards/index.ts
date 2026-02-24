import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListBoardsSchema, ListBoardsInput } from "./schema.js";
import { handleListBoards } from "./handler.js";

export class ListBoardsTool extends BaseTool<ListBoardsInput> {
  readonly name = "list_boards";
  readonly description = "List boards (folders) in a Productive.io project";
  readonly schema = ListBoardsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListBoardsInput): Promise<ToolResponse> {
    return handleListBoards(input, this.apiClient);
  }
}
