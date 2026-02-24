/**
 * Deal/Budget-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface DealAttributes {
  name: string;
  number: number;
  date: string | null;
  closed_at: string | null;
  status: string;
  currency: string;
  budget: boolean;
  probability: number | null;
  budget_total: string | null;
  budget_used: string | null;
  budget_remaining: string | null;
  revenue: string | null;
  cost: string | null;
  profit: string | null;
  worked_time: number | null;
  billable_time: number | null;
  budgeted_time: number | null;
  created_at: string;
  updated_at: string;
  last_activity_at: string | null;
}

export interface DealRelationships {
  company?: JsonApiRelationship;
  responsible?: JsonApiRelationship;
  project?: JsonApiRelationship;
  deal_status?: JsonApiRelationship;
  contract?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveDeal {
  id: string;
  type: string;
  attributes: DealAttributes;
  relationships?: DealRelationships;
}

export interface DealFilters extends BaseFilters {
  company_id?: string;
  responsible_id?: string;
  project_id?: string;
  status_id?: string;
  budget_status?: string;
  deal_type_id?: string;
  query?: string;
  tags?: string;
  recurring?: string;
  pipeline_id?: string;
}
