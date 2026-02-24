/**
 * Time Entry-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface TimeEntryAttributes {
  date: string;
  time: number;
  billable_time: number | null;
  note: string | null;
  track_method_id: number | null;
  started_at: string | null;
  approved: boolean;
  approved_at: string | null;
  invoiced: boolean;
  rejected: boolean;
  rejected_reason: string | null;
  overhead: boolean;
  created_at: string;
  updated_at: string;
}

export interface TimeEntryRelationships {
  person?: JsonApiRelationship;
  service?: JsonApiRelationship;
  task?: JsonApiRelationship;
  approver?: JsonApiRelationship;
  creator?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveTimeEntry {
  id: string;
  type: string;
  attributes: TimeEntryAttributes;
  relationships?: TimeEntryRelationships;
}

export interface TimeEntryFilters extends BaseFilters {
  person_id?: string;
  project_id?: string;
  service_id?: string;
  task_id?: string;
  deal_id?: string;
  company_id?: string;
  after?: string;
  before?: string;
  status?: string;
  invoiced?: string;
  billing_type_id?: string;
  approved_at?: string;
}

export interface CreateTimeEntryInput {
  date: string;
  time: number;
  note?: string;
  person_id: string;
  service_id: string;
  task_id?: string;
}

export interface UpdateTimeEntryInput {
  date?: string;
  time?: number;
  billable_time?: number;
  note?: string;
}
