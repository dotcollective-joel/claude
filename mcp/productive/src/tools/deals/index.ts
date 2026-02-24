/**
 * Deals Tool Group
 * Exports all deal/budget-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetDealTool } from "./get-deal/index.js";
import { ListDealsTool } from "./list-deals/index.js";

export const dealTools: Tool[] = [
  new GetDealTool(),
  new ListDealsTool(),
];
