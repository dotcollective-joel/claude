/**
 * JSON:API Utilities
 * Helpers for building JSON:API request bodies and resolving included resources
 */

import { JsonApiResource } from "../types/common.types.js";

/**
 * Build a JSON:API request body for create/update operations
 */
export function buildJsonApiBody(
  type: string,
  attributes: Record<string, unknown>,
  relationships?: Record<string, { type: string; id: string } | null>
): Record<string, unknown> {
  const body: Record<string, unknown> = {
    data: {
      type,
      attributes,
    },
  };

  if (relationships) {
    const rels: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(relationships)) {
      if (value === null) {
        rels[key] = { data: null };
      } else {
        rels[key] = { data: { type: value.type, id: value.id } };
      }
    }
    (body.data as Record<string, unknown>).relationships = rels;
  }

  return body;
}

/**
 * Build a JSON:API update body (includes resource ID)
 */
export function buildJsonApiUpdateBody(
  type: string,
  id: string,
  attributes: Record<string, unknown>,
  relationships?: Record<string, { type: string; id: string } | null>
): Record<string, unknown> {
  const body = buildJsonApiBody(type, attributes, relationships);
  (body.data as Record<string, unknown>).id = id;
  return body;
}

/**
 * Resolve a resource from the JSON:API `included` array by type and ID
 */
export function resolveIncluded<T extends JsonApiResource = JsonApiResource>(
  included: JsonApiResource[] | undefined,
  type: string,
  id: string
): T | undefined {
  if (!included) return undefined;
  return included.find((r) => r.type === type && r.id === id) as T | undefined;
}

/**
 * Resolve all resources of a given type from the `included` array
 */
export function resolveAllIncluded<T extends JsonApiResource = JsonApiResource>(
  included: JsonApiResource[] | undefined,
  type: string
): T[] {
  if (!included) return [];
  return included.filter((r) => r.type === type) as T[];
}

/**
 * Get the name attribute from an included resource, with fallback
 */
export function resolveIncludedName(
  included: JsonApiResource[] | undefined,
  type: string,
  id: string | undefined,
  fallback: string = "Unknown"
): string {
  if (!id) return fallback;
  const resource = resolveIncluded(included, type, id);
  if (!resource) return fallback;
  return (resource.attributes as Record<string, unknown>).name as string || fallback;
}
