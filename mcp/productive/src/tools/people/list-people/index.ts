import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListPeopleSchema, ListPeopleInput } from "./schema.js";
import { handleListPeople } from "./handler.js";

export class ListPeopleTool extends BaseTool<ListPeopleInput> {
  readonly name = "list_people";
  readonly description = "List people in Productive.io with optional filters";
  readonly schema = ListPeopleSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListPeopleInput): Promise<ToolResponse> {
    return handleListPeople(input, this.apiClient);
  }
}
