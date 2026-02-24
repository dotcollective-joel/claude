/**
 * Teams Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListTeamsTool } from "./list-teams/index.js";
import { GetTeamTool } from "./get-team/index.js";
import { ListMembershipsTool } from "./list-memberships/index.js";

export const teamTools: Tool[] = [
  new ListTeamsTool(),
  new GetTeamTool(),
  new ListMembershipsTool(),
];
