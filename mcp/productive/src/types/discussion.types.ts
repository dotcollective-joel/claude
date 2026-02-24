/**
 * Discussion-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface DiscussionAttributes {
  title: string;
  body: string | null;
  created_at: string;
  updated_at: string;
}

export interface DiscussionRelationships {
  person?: JsonApiRelationship;
  task?: JsonApiRelationship;
  deal?: JsonApiRelationship;
  project?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveDiscussion {
  id: string;
  type: string;
  attributes: DiscussionAttributes;
  relationships?: DiscussionRelationships;
}

export interface DiscussionFilters extends BaseFilters {
  person_id?: string;
  task_id?: string;
  deal_id?: string;
  project_id?: string;
}

export interface CreateDiscussionInput {
  title: string;
  body?: string;
  task_id?: string;
  deal_id?: string;
  project_id?: string;
}
