/**
 * Invoice-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface InvoiceAttributes {
  number: string | null;
  subject: string | null;
  invoiced_on: string;
  sent_on: string | null;
  pay_on: string | null;
  delivery_on: string | null;
  paid_on: string | null;
  finalized_on: string | null;
  amount: string | null;
  amount_tax: string | null;
  amount_with_tax: string | null;
  amount_paid: string | null;
  amount_unpaid: string | null;
  amount_credited: string | null;
  currency: string;
  invoice_state: string;
  invoice_status: string;
  payment_status: string;
  sent_status: string;
  export_status: string | null;
  tag_list: string[];
  created_at: string;
  updated_at: string;
}

export interface InvoiceRelationships {
  company?: JsonApiRelationship;
  creator?: JsonApiRelationship;
  responsible?: JsonApiRelationship;
  subsidiary?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveInvoice {
  id: string;
  type: string;
  attributes: InvoiceAttributes;
  relationships?: InvoiceRelationships;
}

export interface InvoiceFilters extends BaseFilters {
  company_id?: string;
  deal_id?: string;
  project_id?: string;
  creator_id?: string;
  responsible_id?: string;
  invoice_state?: string;
  invoice_status?: string;
  payment_status?: string;
  sent_status?: string;
  currency?: string;
  invoiced_on_after?: string;
  invoiced_on_before?: string;
  query?: string;
}
