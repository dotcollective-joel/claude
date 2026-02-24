/**
 * Company-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface CompanyAttributes {
  name: string;
  billing_name: string | null;
  vat: string | null;
  default_currency: string | null;
  company_code: string | null;
  domain: string | null;
  due_days: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  last_activity_at: string | null;
}

export interface CompanyRelationships {
  organization?: JsonApiRelationship;
  default_subsidiary?: JsonApiRelationship;
  default_tax_rate?: JsonApiRelationship;
}

export interface ProductiveCompany {
  id: string;
  type: string;
  attributes: CompanyAttributes;
  relationships?: CompanyRelationships;
}

export interface CompanyFilters extends BaseFilters {
  name?: string;
  company_code?: string;
  status?: string;
  subsidiary_id?: string;
  project_id?: string;
  tags?: string;
  query?: string;
}
