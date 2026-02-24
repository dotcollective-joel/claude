/**
 * Workflows Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListWorkflowsTool } from "./list-workflows/index.js";
import { GetWorkflowTool } from "./get-workflow/index.js";
import { ListWorkflowStatusesTool } from "./list-workflow-statuses/index.js";

export const workflowTools: Tool[] = [
  new ListWorkflowsTool(),
  new GetWorkflowTool(),
  new ListWorkflowStatusesTool(),
];
