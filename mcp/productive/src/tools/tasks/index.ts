/**
 * Tasks Tool Group
 * Exports all task-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetTaskTool } from "./get-task/index.js";
import { GetTasksTool } from "./get-tasks/index.js";
import { CreateTaskTool } from "./create-task/index.js";
import { UpdateTaskTool } from "./update-task/index.js";
import { DeleteTaskTool } from "./delete-task/index.js";
import { CreateSubtaskTool } from "./create-subtask/index.js";
import { CreateTodoTool } from "./create-todo/index.js";
import { UpdateTodoTool } from "./update-todo/index.js";
import { CreateCommentTool } from "./create-comment/index.js";

export const taskTools: Tool[] = [
  new GetTaskTool(),
  new GetTasksTool(),
  new CreateTaskTool(),
  new UpdateTaskTool(),
  new DeleteTaskTool(),
  new CreateSubtaskTool(),
  new CreateTodoTool(),
  new UpdateTodoTool(),
  new CreateCommentTool(),
];
