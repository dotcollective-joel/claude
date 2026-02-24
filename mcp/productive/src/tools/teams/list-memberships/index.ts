import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListMembershipsSchema, ListMembershipsInput } from "./schema.js";
import { handleListMemberships } from "./handler.js";

export class ListMembershipsTool extends BaseTool<ListMembershipsInput> {
  readonly name = "list_memberships";
  readonly description = "List team memberships in Productive.io with optional team and person filters";
  readonly schema = ListMembershipsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListMembershipsInput): Promise<ToolResponse> {
    return handleListMemberships(input, this.apiClient);
  }
}
