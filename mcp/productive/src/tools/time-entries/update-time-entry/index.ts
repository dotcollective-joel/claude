import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { UpdateTimeEntrySchema, UpdateTimeEntryInput } from "./schema.js";
import { handleUpdateTimeEntry } from "./handler.js";

export class UpdateTimeEntryTool extends BaseTool<UpdateTimeEntryInput> {
  readonly name = "update_time_entry";
  readonly description = "Update an existing time entry in Productive.io";
  readonly schema = UpdateTimeEntrySchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: UpdateTimeEntryInput): Promise<ToolResponse> {
    return handleUpdateTimeEntry(input, this.apiClient);
  }
}
