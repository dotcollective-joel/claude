/**
 * Payment-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface PaymentAttributes {
  amount: string;
  currency: string;
  date: string;
  note: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface PaymentRelationships {
  company?: JsonApiRelationship;
  deal?: JsonApiRelationship;
  invoice?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductivePayment {
  id: string;
  type: string;
  attributes: PaymentAttributes;
  relationships?: PaymentRelationships;
}

export interface PaymentFilters extends BaseFilters {
  company_id?: string;
  deal_id?: string;
  invoice_id?: string;
}
