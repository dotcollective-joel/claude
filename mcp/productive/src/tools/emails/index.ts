/**
 * Emails Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListEmailsTool } from "./list-emails/index.js";

export const emailTools: Tool[] = [
  new ListEmailsTool(),
];
