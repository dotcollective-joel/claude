/**
 * Bookings Tool Group
 * Exports all booking-related tools
 */

import { Tool } from "../../types/tool.types.js";
import { ListBookingsTool } from "./list-bookings/index.js";

export const bookingTools: Tool[] = [
  new ListBookingsTool(),
];
