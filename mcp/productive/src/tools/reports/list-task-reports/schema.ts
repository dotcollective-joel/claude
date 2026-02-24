import { BaseReportSchema } from "../_shared/schema.js";

export const ListTaskReportsSchema = BaseReportSchema;
export type ListTaskReportsInput = typeof ListTaskReportsSchema._type;
