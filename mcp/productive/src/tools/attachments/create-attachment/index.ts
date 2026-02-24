import { BaseTool } from "../../base/BaseTool.js";
import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateAttachmentSchema, CreateAttachmentInput } from "./schema.js";
import { handleCreateAttachment } from "./handler.js";

export class CreateAttachmentTool extends BaseTool<CreateAttachmentInput> {
  readonly name = "create_attachment";
  readonly description = "Attach a file to a resource in Productive.io";
  readonly schema = CreateAttachmentSchema;

  private apiClient: ProductiveApiClient;

  constructor(apiClient?: ProductiveApiClient) {
    super();
    this.apiClient = apiClient || new ProductiveApiClient();
  }

  async execute(input: CreateAttachmentInput): Promise<ToolResponse> {
    return handleCreateAttachment(input, this.apiClient);
  }
}
