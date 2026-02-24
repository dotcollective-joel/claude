/**
 * Booking-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface BookingAttributes {
  started_on: string;
  ended_on: string;
  time: number | null;
  total_time: number | null;
  percentage: number | null;
  note: string | null;
  booking_method_id: number;
  approved: boolean;
  approved_at: string | null;
  rejected: boolean;
  rejected_at: string | null;
  canceled: boolean;
  canceled_at: string | null;
  draft: boolean;
  autotracking: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingRelationships {
  person?: JsonApiRelationship;
  service?: JsonApiRelationship;
  event?: JsonApiRelationship;
  task?: JsonApiRelationship;
  approver?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveBooking {
  id: string;
  type: string;
  attributes: BookingAttributes;
  relationships?: BookingRelationships;
}

export interface BookingFilters extends BaseFilters {
  person_id?: string;
  project_id?: string;
  company_id?: string;
  budget_id?: string;
  after?: string;
  before?: string;
  approval_status?: string;
  person_type?: string;
  booking_type?: string;
  draft?: string;
  canceled?: string;
}
