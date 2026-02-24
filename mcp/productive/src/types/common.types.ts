/**
 * Common JSON:API Types
 * Shared type definitions used across all Productive.io resource types
 */

export interface JsonApiRelationship {
  data: { id: string; type: string } | null;
}

export interface JsonApiRelationshipArray {
  data: Array<{ id: string; type: string }>;
}

export interface JsonApiResource<
  TAttributes = Record<string, unknown>,
  TRelationships = Record<string, JsonApiRelationship | JsonApiRelationshipArray>,
> {
  id: string;
  type: string;
  attributes: TAttributes;
  relationships?: TRelationships;
}

export interface JsonApiDocument<T> {
  data: T;
  included?: JsonApiResource[];
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total_count?: number;
  page_count?: number;
  current_page?: number;
  page_size?: number;
  max_page_size?: number;
}

export interface JsonApiError {
  status: number;
  title: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
}

export interface JsonApiErrorResponse {
  errors: JsonApiError[];
}

export interface BaseFilters {
  page_number?: number;
  page_size?: number;
  sort?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  included: JsonApiResource[];
  meta: PaginationMeta;
}

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface RequestOptions {
  method?: HttpMethod;
  body?: Record<string, unknown>;
  params?: Record<string, string | number | boolean | string[] | undefined>;
}
