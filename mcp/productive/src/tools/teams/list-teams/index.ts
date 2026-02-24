import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListTeamsSchema, ListTeamsInput } from "./schema.js";
import { handleListTeams } from "./handler.js";

export class ListTeamsTool extends BaseTool<ListTeamsInput> {
  readonly name = "list_teams";
  readonly description = "List teams in Productive.io with optional name filter";
  readonly schema = ListTeamsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListTeamsInput): Promise<ToolResponse> {
    return handleListTeams(input, this.apiClient);
  }
}
