/**
 * Webhook-related Types
 */

import { BaseFilters } from "./common.types.js";

export enum WebhookEventId {
  TaskCreated = 1,
  InvoiceCreated = 2,
  DealCreated = 3,
  BudgetCreated = 4,
  ProjectCreated = 5,
  TimeEntryCreated = 6,
  BookingCreated = 7,
  ExpenseCreated = 8,
  PersonCreated = 9,
  CompanyCreated = 10,
  PaymentCreated = 11,
  DealUpdated = 12,
  DealDeleted = 13,
  InvoiceUpdated = 14,
  InvoiceDeleted = 15,
  TaskUpdated = 24,
  TaskDeleted = 25,
}

export enum WebhookState {
  Working = 1,
  Issues = 2,
  Waiting = 3,
}

export enum WebhookType {
  Webhook = 1,
  Zapier = 2,
}

export interface WebhookAttributes {
  name: string | null;
  target_url: string;
  event_id: number;
  state_id: number;
  type_id: number;
  custom_headers: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}

export interface ProductiveWebhook {
  id: string;
  type: string;
  attributes: WebhookAttributes;
}

export interface WebhookFilters extends BaseFilters {
  state_id?: string;
  event_id?: string;
  type_id?: string;
}

export interface CreateWebhookInput {
  event_id: number;
  target_url: string;
  name?: string;
  type_id?: number;
  custom_headers?: Record<string, string>;
}
