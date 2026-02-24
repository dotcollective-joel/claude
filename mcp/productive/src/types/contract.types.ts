/**
 * Contract-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface ContractAttributes {
  name: string;
  number: string | null;
  note: string | null;
  starts_on: string | null;
  ends_on: string | null;
  recurring: boolean;
  recurring_period: string | null;
  automatic_renewal: boolean;
  notice_period: string | null;
  value: string | null;
  currency: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContractRelationships {
  company?: JsonApiRelationship;
  deal?: JsonApiRelationship;
  responsible?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveContract {
  id: string;
  type: string;
  attributes: ContractAttributes;
  relationships?: ContractRelationships;
}

export interface ContractFilters extends BaseFilters {
  company_id?: string;
  deal_id?: string;
  responsible_id?: string;
  query?: string;
}
