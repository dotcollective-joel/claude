/**
 * URL Extraction Utilities
 * Helpers for parsing Productive.io URLs to extract resource IDs
 */

/**
 * Extract a resource ID from a Productive.io URL by resource type
 *
 * Supports patterns like:
 *   https://app.productive.io/{org}/tasks/{id}
 *   https://app.productive.io/{org}/projects/{id}/boards/{id}
 *   https://app.productive.io/{org}/deals/{id}
 */
export function extractResourceId(
  url: string,
  resourceType: string
): string | null {
  if (!url) return null;
  const pattern = new RegExp(`\\/${resourceType}\\/(\\d+)`);
  const match = url.match(pattern);
  return match ? match[1] : null;
}

/**
 * Extract all recognizable resource IDs from a Productive.io URL
 *
 * Returns a map of resource type to ID for all resources found in the URL.
 */
export function extractResourceIds(
  url: string
): Record<string, string> {
  if (!url) return {};

  const resourceTypes = [
    "tasks",
    "projects",
    "boards",
    "deals",
    "invoices",
    "companies",
    "people",
    "services",
    "bookings",
    "time_entries",
    "expenses",
    "contracts",
    "discussions",
    "task_lists",
    "workflows",
    "custom_fields",
    "webhooks",
    "purchase_orders",
    "bills",
    "payments",
  ];

  const results: Record<string, string> = {};
  for (const type of resourceTypes) {
    const id = extractResourceId(url, type);
    if (id) {
      results[type] = id;
    }
  }

  return results;
}

/**
 * Check if a string looks like a Productive.io URL
 */
export function isProductiveUrl(value: string): boolean {
  return /^https?:\/\/app\.productive\.io\//.test(value);
}

/**
 * Determine if a value is a numeric ID or a URL, and extract the ID accordingly
 */
export function resolveId(
  value: string,
  resourceType: string
): string | null {
  if (/^\d+$/.test(value)) {
    return value;
  }
  if (isProductiveUrl(value)) {
    return extractResourceId(value, resourceType);
  }
  return null;
}
