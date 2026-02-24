import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListEmailsSchema, ListEmailsInput } from "./schema.js";
import { handleListEmails } from "./handler.js";

export class ListEmailsTool extends BaseTool<ListEmailsInput> {
  readonly name = "list_emails";
  readonly description = "List emails on a deal in Productive.io";
  readonly schema = ListEmailsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListEmailsInput): Promise<ToolResponse> {
    return handleListEmails(input, this.apiClient);
  }
}
