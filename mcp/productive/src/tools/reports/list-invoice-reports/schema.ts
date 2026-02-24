import { BaseReportSchema } from "../_shared/schema.js";

export const ListInvoiceReportsSchema = BaseReportSchema;
export type ListInvoiceReportsInput = typeof ListInvoiceReportsSchema._type;
