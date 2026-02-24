/**
 * Discussions Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListDiscussionsTool } from "./list-discussions/index.js";
import { CreateDiscussionTool } from "./create-discussion/index.js";

export const discussionTools: Tool[] = [
  new ListDiscussionsTool(),
  new CreateDiscussionTool(),
];
