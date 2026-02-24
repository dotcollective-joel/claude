/**
 * Report-related Types
 */

import { BaseFilters } from "./common.types.js";

export interface ReportFilters extends BaseFilters {
  group?: string;
  after?: string;
  before?: string;
  company_id?: string;
  project_id?: string;
  person_id?: string;
  budget_id?: string;
  deal_id?: string;
  service_id?: string;
  subsidiary_id?: string;
}

export interface TimeEntryReportAttributes {
  currency: string | null;
  count: number;
  time: number;
  billable_time: number;
  mandays: number | null;
  total_revenue: string | null;
  total_cost: string | null;
  total_profit: string | null;
  // Grouping fields (may be present depending on group parameter)
  person_name?: string;
  project_name?: string;
  service_name?: string;
  company_name?: string;
  date?: string;
}

export interface BudgetReportAttributes {
  currency: string | null;
  count: number;
  total_budgeted_time: number | null;
  total_worked_time: number | null;
  total_revenue: string | null;
  total_cost: string | null;
  total_profit: string | null;
  total_budget_total: string | null;
  total_budget_used: string | null;
  total_budget_remaining: string | null;
  budget_name?: string;
  company_name?: string;
  project_name?: string;
}

export interface ProjectReportAttributes {
  count: number;
  project_name?: string;
  company_name?: string;
  status?: string;
}

export interface TaskReportAttributes {
  count: number;
  project_name?: string;
  assignee_name?: string;
  workflow_status_name?: string;
}

export interface DealReportAttributes {
  count: number;
  total_revenue: string | null;
  total_cost: string | null;
  total_profit: string | null;
  probability: number | null;
  deal_name?: string;
  company_name?: string;
  stage_status?: string;
}

export interface BookingReportAttributes {
  currency: string | null;
  count: number;
  time: number;
  mandays: number | null;
  total_recognized_revenue: string | null;
  total_cost: string | null;
  total_recognized_profit: string | null;
  person_name?: string;
  project_name?: string;
}

export interface ProductiveReport<T = Record<string, unknown>> {
  id: string;
  type: string;
  attributes: T;
}
