/**
 * Companies Tool Group
 * Exports all company-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetCompanyTool } from "./get-company/index.js";
import { ListCompaniesTool } from "./list-companies/index.js";

export const companyTools: Tool[] = [
  new GetCompanyTool(),
  new ListCompaniesTool(),
];
