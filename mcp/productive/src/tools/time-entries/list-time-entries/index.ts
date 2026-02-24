import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListTimeEntriesSchema, ListTimeEntriesInput } from "./schema.js";
import { handleListTimeEntries } from "./handler.js";

export class ListTimeEntriesTool extends BaseTool<ListTimeEntriesInput> {
  readonly name = "list_time_entries";
  readonly description = "List time entries from Productive.io with optional filters";
  readonly schema = ListTimeEntriesSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListTimeEntriesInput): Promise<ToolResponse> {
    return handleListTimeEntries(input, this.apiClient);
  }
}
