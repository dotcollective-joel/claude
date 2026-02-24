/**
 * Service Types Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListServiceTypesTool } from "./list-service-types/index.js";

export const serviceTypeTools: Tool[] = [
  new ListServiceTypesTool(),
];
