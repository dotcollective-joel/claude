/**
 * Reports Tool Group
 * Aggregated report tools for time entries, budgets, projects, tasks, deals,
 * companies, bookings, expenses, invoices, and payments.
 */

import { Tool } from "../../types/tool.types.js";
import { ListTimeEntryReportsTool } from "./list-time-entry-reports/index.js";
import { ListBudgetReportsTool } from "./list-budget-reports/index.js";
import { ListProjectReportsTool } from "./list-project-reports/index.js";
import { ListTaskReportsTool } from "./list-task-reports/index.js";
import { ListDealReportsTool } from "./list-deal-reports/index.js";
import { ListCompanyReportsTool } from "./list-company-reports/index.js";
import { ListBookingReportsTool } from "./list-booking-reports/index.js";
import { ListExpenseReportsTool } from "./list-expense-reports/index.js";
import { ListInvoiceReportsTool } from "./list-invoice-reports/index.js";
import { ListPaymentReportsTool } from "./list-payment-reports/index.js";

export const reportTools: Tool[] = [
  new ListTimeEntryReportsTool(),
  new ListBudgetReportsTool(),
  new ListProjectReportsTool(),
  new ListTaskReportsTool(),
  new ListDealReportsTool(),
  new ListCompanyReportsTool(),
  new ListBookingReportsTool(),
  new ListExpenseReportsTool(),
  new ListInvoiceReportsTool(),
  new ListPaymentReportsTool(),
];
