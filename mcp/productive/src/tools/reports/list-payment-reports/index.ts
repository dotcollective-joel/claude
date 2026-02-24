import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListPaymentReportsSchema, ListPaymentReportsInput } from "./schema.js";
import { handleListPaymentReports } from "./handler.js";

export class ListPaymentReportsTool extends BaseTool<ListPaymentReportsInput> {
  readonly name = "list_payment_reports";
  readonly description = "Get aggregated payment tracking reports from Productive.io";
  readonly schema = ListPaymentReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListPaymentReportsInput): Promise<ToolResponse> {
    return handleListPaymentReports(input, this.apiClient);
  }
}
