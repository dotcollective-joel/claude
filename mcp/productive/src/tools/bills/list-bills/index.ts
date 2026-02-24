import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListBillsSchema, ListBillsInput } from "./schema.js";
import { handleListBills } from "./handler.js";

export class ListBillsTool extends BaseTool<ListBillsInput> {
  readonly name = "list_bills";
  readonly description = "List bills in Productive.io";
  readonly schema = ListBillsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListBillsInput): Promise<ToolResponse> {
    return handleListBills(input, this.apiClient);
  }
}
