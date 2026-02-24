/**
 * Purchase Orders Tool Group
 */

import { Tool } from "../../types/tool.types.js";
import { ListPurchaseOrdersTool } from "./list-purchase-orders/index.js";

export const purchaseOrderTools: Tool[] = [
  new ListPurchaseOrdersTool(),
];
