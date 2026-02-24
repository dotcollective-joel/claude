/**
 * Purchase Order-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface PurchaseOrderAttributes {
  number: string | null;
  title: string;
  status: number;
  total: string | null;
  currency: string | null;
  date: string | null;
  due_date: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrderRelationships {
  company?: JsonApiRelationship;
  deal?: JsonApiRelationship;
  creator?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductivePurchaseOrder {
  id: string;
  type: string;
  attributes: PurchaseOrderAttributes;
  relationships?: PurchaseOrderRelationships;
}

export interface PurchaseOrderFilters extends BaseFilters {
  company_id?: string;
  deal_id?: string;
  status?: string;
  query?: string;
}
