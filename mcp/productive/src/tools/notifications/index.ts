/**
 * Notifications Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListNotificationsTool } from "./list-notifications/index.js";

export const notificationTools: Tool[] = [
  new ListNotificationsTool(),
];
