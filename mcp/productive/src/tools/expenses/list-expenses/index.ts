import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListExpensesSchema, ListExpensesInput } from "./schema.js";
import { handleListExpenses } from "./handler.js";

export class ListExpensesTool extends BaseTool<ListExpensesInput> {
  readonly name = "list_expenses";
  readonly description = "List expenses from Productive.io with optional filters";
  readonly schema = ListExpensesSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListExpensesInput): Promise<ToolResponse> {
    return handleListExpenses(input, this.apiClient);
  }
}
