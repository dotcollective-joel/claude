/**
 * Expense-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface ExpenseAttributes {
  name: string;
  amount: string;
  billable_amount: string | null;
  currency: string;
  date: string;
  pay_on: string | null;
  paid_on: string | null;
  reimbursable: boolean;
  position: number | null;
  quantity: number | null;
  approved: boolean;
  approved_at: string | null;
  invoiced: boolean;
  created_at: string;
  updated_at: string;
}

export interface ExpenseRelationships {
  service?: JsonApiRelationship;
  person?: JsonApiRelationship;
  vendor?: JsonApiRelationship;
  approver?: JsonApiRelationship;
  creator?: JsonApiRelationship;
  purchase_order?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveExpense {
  id: string;
  type: string;
  attributes: ExpenseAttributes;
  relationships?: ExpenseRelationships;
}

export interface ExpenseFilters extends BaseFilters {
  service_id?: string;
  person_id?: string;
  company_id?: string;
  project_id?: string;
  date_after?: string;
  date_before?: string;
  status?: string;
  invoiced?: string;
  approval_status?: string;
  query?: string;
}
