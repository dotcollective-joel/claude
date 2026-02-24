import { BaseReportSchema } from "../_shared/schema.js";

export const ListBudgetReportsSchema = BaseReportSchema;
export type ListBudgetReportsInput = typeof ListBudgetReportsSchema._type;
