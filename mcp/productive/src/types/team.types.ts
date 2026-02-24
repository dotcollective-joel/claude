/**
 * Team-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface TeamAttributes {
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ProductiveTeam {
  id: string;
  type: string;
  attributes: TeamAttributes;
  relationships?: {
    organization?: JsonApiRelationship;
  };
}

export interface TeamFilters extends BaseFilters {
  name?: string;
}

export interface MembershipAttributes {
  role: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductiveMembership {
  id: string;
  type: string;
  attributes: MembershipAttributes;
  relationships?: {
    person?: JsonApiRelationship;
    team?: JsonApiRelationship;
    organization?: JsonApiRelationship;
  };
}

export interface MembershipFilters extends BaseFilters {
  team_id?: string;
  person_id?: string;
}
