/**
 * Tasks Tool Group
 * Exports all task-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetTaskTool } from "./get-task/index.js";
import { GetTasksTool } from "./get-tasks/index.js";

export const taskTools: Tool[] = [
  new GetTaskTool(),
  new GetTasksTool(),
];
