import { BaseReportSchema } from "../_shared/schema.js";

export const ListExpenseReportsSchema = BaseReportSchema;
export type ListExpenseReportsInput = typeof ListExpenseReportsSchema._type;
