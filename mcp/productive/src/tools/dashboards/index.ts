/**
 * Dashboards Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListDashboardsTool } from "./list-dashboards/index.js";

export const dashboardTools: Tool[] = [
  new ListDashboardsTool(),
];
