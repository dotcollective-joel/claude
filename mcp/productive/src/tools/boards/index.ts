/**
 * Boards Tool Group
 * Exports all board-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetBoardTool } from "./get-board/index.js";
import { ListBoardsTool } from "./list-boards/index.js";

export const boardTools: Tool[] = [
  new GetBoardTool(),
  new ListBoardsTool(),
];
