/**
 * Custom Field-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface CustomFieldAttributes {
  name: string;
  field_type: string;
  resource_type: string;
  required: boolean;
  description: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface ProductiveCustomField {
  id: string;
  type: string;
  attributes: CustomFieldAttributes;
  relationships?: {
    organization?: JsonApiRelationship;
  };
}

export interface CustomFieldFilters extends BaseFilters {
  // No documented filters beyond pagination
}

export interface CustomFieldOptionAttributes {
  value: string;
  position: number;
  color: string | null;
}

export interface ProductiveCustomFieldOption {
  id: string;
  type: string;
  attributes: CustomFieldOptionAttributes;
  relationships?: {
    custom_field?: JsonApiRelationship;
  };
}

export interface CustomFieldOptionFilters extends BaseFilters {
  custom_field_id?: string;
}
