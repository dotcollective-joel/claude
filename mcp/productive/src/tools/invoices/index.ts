/**
 * Invoices Tool Group
 * Exports all invoice-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { GetInvoiceTool } from "./get-invoice/index.js";
import { ListInvoicesTool } from "./list-invoices/index.js";

export const invoiceTools: Tool[] = [
  new GetInvoiceTool(),
  new ListInvoicesTool(),
];
