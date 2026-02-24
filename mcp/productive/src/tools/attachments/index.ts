/**
 * Attachments Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { CreateAttachmentTool } from "./create-attachment/index.js";

export const attachmentTools: Tool[] = [
  new CreateAttachmentTool(),
];
