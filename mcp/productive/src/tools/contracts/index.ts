/**
 * Contracts Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListContractsTool } from "./list-contracts/index.js";

export const contractTools: Tool[] = [
  new ListContractsTool(),
];
