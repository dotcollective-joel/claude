/**
 * Time Entries Tool Group
 * Exports all time entry-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetTimeEntryTool } from "./get-time-entry/index.js";
import { ListTimeEntriesTool } from "./list-time-entries/index.js";
import { CreateTimeEntryTool } from "./create-time-entry/index.js";
import { UpdateTimeEntryTool } from "./update-time-entry/index.js";

export const timeEntryTools: Tool[] = [
  new GetTimeEntryTool(),
  new ListTimeEntriesTool(),
  new CreateTimeEntryTool(),
  new UpdateTimeEntryTool(),
];
