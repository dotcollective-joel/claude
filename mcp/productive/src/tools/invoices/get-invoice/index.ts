import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetInvoiceSchema, GetInvoiceInput } from "./schema.js";
import { handleGetInvoice } from "./handler.js";

export class GetInvoiceTool extends BaseTool<GetInvoiceInput> {
  readonly name = "get_invoice";
  readonly description = "Get a Productive.io invoice by ID or URL";
  readonly schema = GetInvoiceSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetInvoiceInput): Promise<ToolResponse> {
    return handleGetInvoice(input, this.apiClient);
  }
}
