import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListCustomFieldsSchema, ListCustomFieldsInput } from "./schema.js";
import { handleListCustomFields } from "./handler.js";

export class ListCustomFieldsTool extends BaseTool<ListCustomFieldsInput> {
  readonly name = "list_custom_fields";
  readonly description = "List custom field definitions in Productive.io";
  readonly schema = ListCustomFieldsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListCustomFieldsInput): Promise<ToolResponse> {
    return handleListCustomFields(input, this.apiClient);
  }
}
