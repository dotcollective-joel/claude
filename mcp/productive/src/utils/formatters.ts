/**
 * Shared Output Formatters
 * Reusable functions for formatting API responses as markdown
 */

/**
 * Format a resource header with type, name, and optional ID
 */
export function formatResourceHeader(
  type: string,
  name: string,
  id?: string
): string {
  const idSuffix = id ? ` (ID: ${id})` : "";
  return `# ${name}${idSuffix}\n**Type:** ${type}`;
}

/**
 * Format a set of key-value attributes as markdown
 */
export function formatAttributes(
  attrs: Record<string, unknown>,
  labels?: Record<string, string>
): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined) continue;
    const label = labels?.[key] || formatLabel(key);
    lines.push(`**${label}:** ${value}`);
  }
  return lines.join("\n");
}

/**
 * Format a list of items with a custom formatter function
 */
export function formatList<T>(
  items: T[],
  formatter: (item: T, index: number) => string,
  emptyMessage: string = "No items found."
): string {
  if (items.length === 0) return emptyMessage;
  return items.map((item, i) => formatter(item, i)).join("\n");
}

/**
 * Format an ISO date string to a human-readable format
 */
export function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return "Not set";
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return isoDate;
  }
}

/**
 * Format a date with time component
 */
export function formatDateTime(isoDate: string | null | undefined): string {
  if (!isoDate) return "Not set";
  try {
    const date = new Date(isoDate);
    return date.toLocaleString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoDate;
  }
}

/**
 * Format a currency amount
 */
export function formatCurrency(
  amount: number | string | null | undefined,
  currency?: string
): string {
  if (amount === null || amount === undefined) return "N/A";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "N/A";
  const suffix = currency ? ` ${currency}` : "";
  return `$${num.toFixed(2)}${suffix}`;
}

/**
 * Format minutes as hours and minutes
 */
export function formatMinutes(minutes: number | null | undefined): string {
  if (minutes === null || minutes === undefined) return "0h";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Format a boolean status with icon
 */
export function formatStatus(closed: boolean): string {
  return closed ? "Closed" : "Open";
}

/**
 * Format a checkbox-style status
 */
export function formatCheckbox(completed: boolean): string {
  return completed ? "✓" : "○";
}

/**
 * Convert a snake_case or camelCase key to a human-readable label
 */
function formatLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Format a count summary line
 */
export function formatCountSummary(
  count: number,
  singular: string,
  plural?: string
): string {
  const label = count === 1 ? singular : (plural || `${singular}s`);
  return `Found ${count} ${label}`;
}

/**
 * Create a markdown section with heading and content
 */
export function formatSection(
  heading: string,
  content: string,
  level: number = 2
): string {
  const prefix = "#".repeat(level);
  return `${prefix} ${heading}\n\n${content}`;
}
