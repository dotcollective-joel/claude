/**
 * Services Tool Group
 * Exports all service-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetServiceTool } from "./get-service/index.js";
import { ListServicesTool } from "./list-services/index.js";

export const serviceTools: Tool[] = [
  new GetServiceTool(),
  new ListServicesTool(),
];
