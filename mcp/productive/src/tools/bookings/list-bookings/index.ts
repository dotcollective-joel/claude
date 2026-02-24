import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListBookingsSchema, ListBookingsInput } from "./schema.js";
import { handleListBookings } from "./handler.js";

export class ListBookingsTool extends BaseTool<ListBookingsInput> {
  readonly name = "list_bookings";
  readonly description = "List scheduled bookings from Productive.io with optional filters";
  readonly schema = ListBookingsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListBookingsInput): Promise<ToolResponse> {
    return handleListBookings(input, this.apiClient);
  }
}
