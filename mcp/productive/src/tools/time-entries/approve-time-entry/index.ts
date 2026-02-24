import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ApproveTimeEntrySchema, ApproveTimeEntryInput } from "./schema.js";
import { handleApproveTimeEntry } from "./handler.js";

export class ApproveTimeEntryTool extends BaseTool<ApproveTimeEntryInput> {
  readonly name = "approve_time_entry";
  readonly description = "Approve a time entry in Productive.io";
  readonly schema = ApproveTimeEntrySchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ApproveTimeEntryInput): Promise<ToolResponse> {
    return handleApproveTimeEntry(input, this.apiClient);
  }
}
