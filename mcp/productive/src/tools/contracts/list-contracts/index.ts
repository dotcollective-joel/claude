import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListContractsSchema, ListContractsInput } from "./schema.js";
import { handleListContracts } from "./handler.js";

export class ListContractsTool extends BaseTool<ListContractsInput> {
  readonly name = "list_contracts";
  readonly description = "List contracts in Productive.io";
  readonly schema = ListContractsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListContractsInput): Promise<ToolResponse> {
    return handleListContracts(input, this.apiClient);
  }
}
