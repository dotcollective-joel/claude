/**
 * Dashboard-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface DashboardAttributes {
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ProductiveDashboard {
  id: string;
  type: string;
  attributes: DashboardAttributes;
  relationships?: {
    person?: JsonApiRelationship;
    organization?: JsonApiRelationship;
  };
}

export interface DashboardFilters extends BaseFilters {
  // No documented filters beyond pagination
}
