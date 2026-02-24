import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateDiscussionSchema, CreateDiscussionInput } from "./schema.js";
import { handleCreateDiscussion } from "./handler.js";

export class CreateDiscussionTool extends BaseTool<CreateDiscussionInput> {
  readonly name = "create_discussion";
  readonly description = "Create a new discussion in Productive.io";
  readonly schema = CreateDiscussionSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateDiscussionInput): Promise<ToolResponse> {
    return handleCreateDiscussion(input, this.apiClient);
  }
}
