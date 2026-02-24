import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateTimeEntrySchema, CreateTimeEntryInput } from "./schema.js";
import { handleCreateTimeEntry } from "./handler.js";

export class CreateTimeEntryTool extends BaseTool<CreateTimeEntryInput> {
  readonly name = "create_time_entry";
  readonly description = "Create a new time entry in Productive.io";
  readonly schema = CreateTimeEntrySchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateTimeEntryInput): Promise<ToolResponse> {
    return handleCreateTimeEntry(input, this.apiClient);
  }
}
