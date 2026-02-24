/**
 * Bill-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface BillAttributes {
  number: string | null;
  status: number;
  total: string | null;
  currency: string | null;
  date: string | null;
  due_date: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface BillRelationships {
  company?: JsonApiRelationship;
  deal?: JsonApiRelationship;
  creator?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveBill {
  id: string;
  type: string;
  attributes: BillAttributes;
  relationships?: BillRelationships;
}

export interface BillFilters extends BaseFilters {
  company_id?: string;
  deal_id?: string;
  status?: string;
  query?: string;
}
