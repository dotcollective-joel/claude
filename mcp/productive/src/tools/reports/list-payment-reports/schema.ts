import { BaseReportSchema } from "../_shared/schema.js";

export const ListPaymentReportsSchema = BaseReportSchema;
export type ListPaymentReportsInput = typeof ListPaymentReportsSchema._type;
