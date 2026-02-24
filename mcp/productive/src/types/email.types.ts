/**
 * Email-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface EmailAttributes {
  subject: string;
  body: string | null;
  from: string | null;
  to: string | null;
  cc: string | null;
  bcc: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmailRelationships {
  deal?: JsonApiRelationship;
  person?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveEmail {
  id: string;
  type: string;
  attributes: EmailAttributes;
  relationships?: EmailRelationships;
}

export interface EmailFilters extends BaseFilters {
  deal_id?: string;
}
