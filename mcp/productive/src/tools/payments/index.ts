/**
 * Payments Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListPaymentsTool } from "./list-payments/index.js";

export const paymentTools: Tool[] = [
  new ListPaymentsTool(),
];
