import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListInvoiceReportsSchema, ListInvoiceReportsInput } from "./schema.js";
import { handleListInvoiceReports } from "./handler.js";

export class ListInvoiceReportsTool extends BaseTool<ListInvoiceReportsInput> {
  readonly name = "list_invoice_reports";
  readonly description = "Get aggregated invoice status reports from Productive.io";
  readonly schema = ListInvoiceReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListInvoiceReportsInput): Promise<ToolResponse> {
    return handleListInvoiceReports(input, this.apiClient);
  }
}
