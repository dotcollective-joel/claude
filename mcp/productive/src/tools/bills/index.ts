/**
 * Bills Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListBillsTool } from "./list-bills/index.js";

export const billTools: Tool[] = [
  new ListBillsTool(),
];
