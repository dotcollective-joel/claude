import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetTimeEntrySchema, GetTimeEntryInput } from "./schema.js";
import { handleGetTimeEntry } from "./handler.js";

export class GetTimeEntryTool extends BaseTool<GetTimeEntryInput> {
  readonly name = "get_time_entry";
  readonly description = "Get a Productive.io time entry by ID or URL";
  readonly schema = GetTimeEntrySchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetTimeEntryInput): Promise<ToolResponse> {
    return handleGetTimeEntry(input, this.apiClient);
  }
}
