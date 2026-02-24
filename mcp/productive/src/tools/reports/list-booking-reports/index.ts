import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListBookingReportsSchema, ListBookingReportsInput } from "./schema.js";
import { handleListBookingReports } from "./handler.js";

export class ListBookingReportsTool extends BaseTool<ListBookingReportsInput> {
  readonly name = "list_booking_reports";
  readonly description = "Get aggregated resource utilization booking reports from Productive.io";
  readonly schema = ListBookingReportsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListBookingReportsInput): Promise<ToolResponse> {
    return handleListBookingReports(input, this.apiClient);
  }
}
