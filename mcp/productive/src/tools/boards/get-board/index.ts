import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetBoardSchema, GetBoardInput } from "./schema.js";
import { handleGetBoard } from "./handler.js";

export class GetBoardTool extends BaseTool<GetBoardInput> {
  readonly name = "get_board";
  readonly description = "Get a Productive.io board (folder) by ID or URL";
  readonly schema = GetBoardSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetBoardInput): Promise<ToolResponse> {
    return handleGetBoard(input, this.apiClient);
  }
}
