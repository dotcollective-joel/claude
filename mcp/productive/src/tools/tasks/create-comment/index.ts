import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateCommentSchema, CreateCommentInput } from "./schema.js";
import { handleCreateComment } from "./handler.js";

export class CreateCommentTool extends BaseTool<CreateCommentInput> {
  readonly name = "create_comment";
  readonly description = "Add a comment to a task or deal in Productive.io";
  readonly schema = CreateCommentSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateCommentInput): Promise<ToolResponse> {
    return handleCreateComment(input, this.apiClient);
  }
}
