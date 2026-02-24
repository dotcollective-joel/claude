/**
 * Webhooks Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListWebhooksTool } from "./list-webhooks/index.js";
import { CreateWebhookTool } from "./create-webhook/index.js";
import { DeleteWebhookTool } from "./delete-webhook/index.js";

export const webhookTools: Tool[] = [
  new ListWebhooksTool(),
  new CreateWebhookTool(),
  new DeleteWebhookTool(),
];
