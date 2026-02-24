import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListDiscussionsSchema, ListDiscussionsInput } from "./schema.js";
import { handleListDiscussions } from "./handler.js";

export class ListDiscussionsTool extends BaseTool<ListDiscussionsInput> {
  readonly name = "list_discussions";
  readonly description = "List discussions in Productive.io";
  readonly schema = ListDiscussionsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListDiscussionsInput): Promise<ToolResponse> {
    return handleListDiscussions(input, this.apiClient);
  }
}
