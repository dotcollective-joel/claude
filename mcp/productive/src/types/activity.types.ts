/**
 * Activity-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface ActivityAttributes {
  action: string;
  subject_type: string;
  subject_title: string | null;
  changes: Record<string, unknown> | null;
  created_at: string;
}

export interface ActivityRelationships {
  person?: JsonApiRelationship;
  subject?: JsonApiRelationship;
  project?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveActivity {
  id: string;
  type: string;
  attributes: ActivityAttributes;
  relationships?: ActivityRelationships;
}

export interface ActivityFilters extends BaseFilters {
  person_id?: string;
  project_id?: string;
  task_id?: string;
  deal_id?: string;
  company_id?: string;
  after?: string;
  before?: string;
}
