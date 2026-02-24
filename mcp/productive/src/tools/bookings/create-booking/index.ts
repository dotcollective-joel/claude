import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateBookingSchema, CreateBookingInput } from "./schema.js";
import { handleCreateBooking } from "./handler.js";

export class CreateBookingTool extends BaseTool<CreateBookingInput> {
  readonly name = "create_booking";
  readonly description = "Create a new booking in Productive.io";
  readonly schema = CreateBookingSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateBookingInput): Promise<ToolResponse> {
    return handleCreateBooking(input, this.apiClient);
  }
}
