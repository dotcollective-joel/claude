/**
 * Activities Tool Group
 * Exports all activity-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { ListActivitiesTool } from "./list-activities/index.js";

export const activityTools: Tool[] = [
  new ListActivitiesTool(),
];
