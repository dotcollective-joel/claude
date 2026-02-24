/**
 * Service-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface ServiceAttributes {
  name: string;
  description: string | null;
  unit_id: number;
  billing_type_id: number;
  price: string | null;
  quantity: string | null;
  currency: string | null;
  profit_margin: string | null;
  discount: string | null;
  markup: string | null;
  worked_time: number | null;
  billable_time: number | null;
  revenue: string | null;
  budget_used: string | null;
  future_revenue: string | null;
  booking_tracking_enabled: boolean;
  time_tracking_enabled: boolean;
  expense_tracking_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceRelationships {
  deal?: JsonApiRelationship;
  service_type?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveService {
  id: string;
  type: string;
  attributes: ServiceAttributes;
  relationships?: ServiceRelationships;
}

export interface ServiceFilters extends BaseFilters {
  deal_id?: string;
  project_id?: string;
  person_id?: string;
  name?: string;
  billing_type?: string;
  unit?: string;
  budget_status?: string;
  time_tracking_enabled?: string;
}

export interface ServiceTypeAttributes {
  name: string;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductiveServiceType {
  id: string;
  type: string;
  attributes: ServiceTypeAttributes;
}
