import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ApproveExpenseSchema, ApproveExpenseInput } from "./schema.js";
import { handleApproveExpense } from "./handler.js";

export class ApproveExpenseTool extends BaseTool<ApproveExpenseInput> {
  readonly name = "approve_expense";
  readonly description = "Approve an expense in Productive.io";
  readonly schema = ApproveExpenseSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ApproveExpenseInput): Promise<ToolResponse> {
    return handleApproveExpense(input, this.apiClient);
  }
}
