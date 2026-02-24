/**
 * Custom Fields Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListCustomFieldsTool } from "./list-custom-fields/index.js";
import { GetCustomFieldTool } from "./get-custom-field/index.js";
import { ListCustomFieldOptionsTool } from "./list-custom-field-options/index.js";

export const customFieldTools: Tool[] = [
  new ListCustomFieldsTool(),
  new GetCustomFieldTool(),
  new ListCustomFieldOptionsTool(),
];
