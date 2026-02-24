/**
 * People-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface PersonAttributes {
  first_name: string;
  last_name: string;
  email: string | null;
  title: string | null;
  role_id: number | null;
  status: string;
  avatar_url: string | null;
  joined_at: string | null;
  last_seen_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PersonRelationships {
  company?: JsonApiRelationship;
  organization?: JsonApiRelationship;
  manager?: JsonApiRelationship;
  subsidiary?: JsonApiRelationship;
}

export interface ProductivePerson {
  id: string;
  type: string;
  attributes: PersonAttributes;
  relationships?: PersonRelationships;
}

export interface PeopleFilters extends BaseFilters {
  email?: string;
  status?: string;
  person_type?: string;
  role_id?: string;
  company_id?: string;
  team?: string;
  query?: string;
  tags?: string;
  project_id?: string;
  manager_id?: string;
}
