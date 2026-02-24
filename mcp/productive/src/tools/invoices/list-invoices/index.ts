import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListInvoicesSchema, ListInvoicesInput } from "./schema.js";
import { handleListInvoices } from "./handler.js";

export class ListInvoicesTool extends BaseTool<ListInvoicesInput> {
  readonly name = "list_invoices";
  readonly description = "List invoices from Productive.io with optional filters";
  readonly schema = ListInvoicesSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListInvoicesInput): Promise<ToolResponse> {
    return handleListInvoices(input, this.apiClient);
  }
}
