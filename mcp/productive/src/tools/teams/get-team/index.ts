import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetTeamSchema, GetTeamInput } from "./schema.js";
import { handleGetTeam } from "./handler.js";

export class GetTeamTool extends BaseTool<GetTeamInput> {
  readonly name = "get_team";
  readonly description = "Get a team by ID or URL from Productive.io, including its members";
  readonly schema = GetTeamSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetTeamInput): Promise<ToolResponse> {
    return handleGetTeam(input, this.apiClient);
  }
}
