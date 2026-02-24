import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListCustomFieldOptionsSchema, ListCustomFieldOptionsInput } from "./schema.js";
import { handleListCustomFieldOptions } from "./handler.js";

export class ListCustomFieldOptionsTool extends BaseTool<ListCustomFieldOptionsInput> {
  readonly name = "list_custom_field_options";
  readonly description = "List custom field options in Productive.io with optional custom field filter";
  readonly schema = ListCustomFieldOptionsSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: ListCustomFieldOptionsInput): Promise<ToolResponse> {
    return handleListCustomFieldOptions(input, this.apiClient);
  }
}
