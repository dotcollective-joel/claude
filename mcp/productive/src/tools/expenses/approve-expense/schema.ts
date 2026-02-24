import { z } from "zod";

export const ApproveExpenseSchema = z.object({
  expense_id: z.string().describe("The ID of the expense to approve"),
});

export type ApproveExpenseInput = z.infer<typeof ApproveExpenseSchema>;
