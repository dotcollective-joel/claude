import { BaseReportSchema } from "../_shared/schema.js";

export const ListBookingReportsSchema = BaseReportSchema;
export type ListBookingReportsInput = typeof ListBookingReportsSchema._type;
