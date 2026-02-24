/**
 * Shared Report Formatters
 * Generic formatting for report rows using a field configuration
 */

import { formatCurrency, formatMinutes } from "../../../utils/formatters.js";

export type FieldType = "string" | "count" | "currency" | "minutes" | "percentage";

export interface ReportFieldConfig {
  key: string;
  label: string;
  type: FieldType;
}

/**
 * Format a single report row using a field configuration.
 * First field is treated as the row heading; remaining fields are inline details.
 */
export function formatReportRow(
  attrs: Record<string, unknown>,
  fields: ReportFieldConfig[],
  currency?: string | null
): string {
  const parts: string[] = [];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const value = attrs[field.key];

    if (value === undefined || value === null) continue;

    const formatted = formatFieldValue(value, field.type, currency);

    if (i === 0) {
      // First field is the heading
      parts.push(`**${formatted}**`);
    } else {
      parts.push(`${field.label}: ${formatted}`);
    }
  }

  return parts.join(" | ");
}

function formatFieldValue(
  value: unknown,
  type: FieldType,
  currency?: string | null
): string {
  switch (type) {
    case "currency":
      return formatCurrency(value as string | number | null, currency || undefined);
    case "minutes":
      return formatMinutes(value as number | null);
    case "count":
      return String(value);
    case "percentage":
      return `${value}%`;
    case "string":
    default:
      return String(value);
  }
}

/**
 * Build a group label from report attributes by checking common grouping fields
 */
export function getGroupLabel(attrs: Record<string, unknown>): string {
  const groupFields = [
    "person_name", "project_name", "company_name", "service_name",
    "budget_name", "deal_name", "assignee_name", "workflow_status_name",
    "invoice_state", "payment_status", "stage_status", "payment_type",
    "status", "date",
  ];

  const parts: string[] = [];
  for (const field of groupFields) {
    if (attrs[field] !== undefined && attrs[field] !== null) {
      parts.push(String(attrs[field]));
    }
  }

  return parts.length > 0 ? parts.join(" — ") : "Total";
}
