/**
 * Projects Tool Group
 * Exports all project-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetProjectTool } from "./get-project/index.js";
import { ListProjectsTool } from "./list-projects/index.js";
import { ListTaskListsTool } from "./list-task-lists/index.js";
import { CreateProjectTool } from "./create-project/index.js";
import { UpdateProjectTool } from "./update-project/index.js";
import { CreateTaskListTool } from "./create-task-list/index.js";

export const projectTools: Tool[] = [
  new GetProjectTool(),
  new ListProjectsTool(),
  new ListTaskListsTool(),
  new CreateProjectTool(),
  new UpdateProjectTool(),
  new CreateTaskListTool(),
];
