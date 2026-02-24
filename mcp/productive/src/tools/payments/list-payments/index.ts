import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListPaymentsSchema, ListPaymentsInput } from "./schema.js";
import { handleListPayments } from "./handler.js";

export class ListPaymentsTool extends BaseTool<ListPaymentsInput> {
  readonly name = "list_payments";
  readonly description = "List payments in Productive.io";
  readonly schema = ListPaymentsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListPaymentsInput): Promise<ToolResponse> {
    return handleListPayments(input, this.apiClient);
  }
}
