import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetPersonSchema, GetPersonInput } from "./schema.js";
import { handleGetPerson } from "./handler.js";

export class GetPersonTool extends BaseTool<GetPersonInput> {
  readonly name = "get_person";
  readonly description = "Get a Productive.io person by ID or URL";
  readonly schema = GetPersonSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: GetPersonInput): Promise<ToolResponse> {
    return handleGetPerson(input, this.apiClient);
  }
}
