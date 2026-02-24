/**
 * Project-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface ProjectAttributes {
  name: string;
  description: string | null;
  project_number: number;
  project_type_id: number | null;
  status: string;
  budget: number | null;
  budget_used: number | null;
  color: string | null;
  created_at: string;
  updated_at: string;
  last_activity_at: string | null;
  archived_at: string | null;
}

export interface ProjectRelationships {
  company?: JsonApiRelationship;
  project_manager?: JsonApiRelationship;
  workflow?: JsonApiRelationship;
  organization?: JsonApiRelationship;
  last_actor?: JsonApiRelationship;
}

export interface ProductiveProject {
  id: string;
  type: string;
  attributes: ProjectAttributes;
  relationships?: ProjectRelationships;
}

export interface ProjectFilters extends BaseFilters {
  company_id?: string;
  responsible_id?: string;
  person_id?: string;
  status?: string;
  project_type?: string;
  query?: string;
  tags?: string;
}

export interface BoardAttributes {
  name: string;
  position: number;
  placement: string | null;
  hidden: boolean;
  archived_at: string | null;
}

export interface ProductiveBoard {
  id: string;
  type: string;
  attributes: BoardAttributes;
  relationships?: {
    project?: JsonApiRelationship;
    organization?: JsonApiRelationship;
  };
}

export interface BoardFilters extends BaseFilters {
  project_id?: string;
  status?: string;
}
