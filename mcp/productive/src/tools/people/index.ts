/**
 * People Tool Group
 * Exports all people-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetPersonTool } from "./get-person/index.js";
import { ListPeopleTool } from "./list-people/index.js";

export const peopleTools: Tool[] = [
  new GetPersonTool(),
  new ListPeopleTool(),
];
