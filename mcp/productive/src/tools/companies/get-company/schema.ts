import { z } from "zod";

export const GetCompanySchema = z.object({
  company_id: z.string().describe("Company ID or Productive.io company URL"),
});

export type GetCompanyInput = z.infer<typeof GetCompanySchema>;
