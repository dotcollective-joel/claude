import { BaseReportSchema } from "../_shared/schema.js";

export const ListProjectReportsSchema = BaseReportSchema;
export type ListProjectReportsInput = typeof ListProjectReportsSchema._type;
