/**
 * Expenses Tool Group
 * Exports all expense-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { ListExpensesTool } from "./list-expenses/index.js";

export const expenseTools: Tool[] = [
  new ListExpensesTool(),
];
