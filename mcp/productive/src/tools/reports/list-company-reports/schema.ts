import { BaseReportSchema } from "../_shared/schema.js";

export const ListCompanyReportsSchema = BaseReportSchema;
export type ListCompanyReportsInput = typeof ListCompanyReportsSchema._type;
