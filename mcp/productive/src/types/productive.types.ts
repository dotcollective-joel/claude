/**
 * Productive.io API Types
 * Re-exports from domain-specific type files for backward compatibility
 */

// Common types
export type {
  JsonApiRelationship,
  JsonApiRelationshipArray,
  JsonApiResource,
  JsonApiDocument,
  PaginationMeta,
  JsonApiError,
  JsonApiErrorResponse,
  BaseFilters,
  PaginatedResult,
  HttpMethod,
  RequestOptions,
} from "./common.types.js";

// Task types
export type {
  ProductiveTask,
  ProductiveSubtask,
  ProductiveTodo,
  ProductiveComment,
  ProductiveTaskList,
  TaskFilters,
  CreateTaskInput,
  UpdateTaskInput,
} from "./task.types.js";
export { TaskStatus } from "./task.types.js";

// Project types
export type {
  ProductiveProject,
  ProductiveBoard,
  ProjectFilters,
  BoardFilters,
} from "./project.types.js";

// Person types
export type {
  ProductivePerson,
  PeopleFilters,
} from "./person.types.js";

// Company types
export type {
  ProductiveCompany,
  CompanyFilters,
} from "./company.types.js";

// Deal types
export type {
  ProductiveDeal,
  DealFilters,
} from "./deal.types.js";

// Time entry types
export type {
  ProductiveTimeEntry,
  TimeEntryFilters,
  CreateTimeEntryInput,
  UpdateTimeEntryInput,
} from "./time-entry.types.js";

// Invoice types
export type {
  ProductiveInvoice,
  InvoiceFilters,
} from "./invoice.types.js";

// Booking types
export type {
  ProductiveBooking,
  BookingFilters,
} from "./booking.types.js";

// Service types
export type {
  ProductiveService,
  ProductiveServiceType,
  ServiceFilters,
} from "./service.types.js";

// Expense types
export type {
  ProductiveExpense,
  ExpenseFilters,
} from "./expense.types.js";

// Report types
export type {
  ReportFilters,
  ProductiveReport,
} from "./report.types.js";

// Workflow types
export type {
  ProductiveWorkflow,
  ProductiveWorkflowStatus,
  WorkflowFilters,
  WorkflowStatusFilters,
} from "./workflow.types.js";

// Team types
export type {
  ProductiveTeam,
  ProductiveMembership,
  TeamFilters,
  MembershipFilters,
} from "./team.types.js";

// Webhook types
export type {
  ProductiveWebhook,
  WebhookFilters,
  CreateWebhookInput,
} from "./webhook.types.js";
export {
  WebhookEventId,
  WebhookState,
  WebhookType,
} from "./webhook.types.js";

// Legacy response type (kept for backward compatibility with existing tools)
export interface ProductiveApiResponse<T> {
  data: T;
  included?: Array<{
    id: string;
    type: string;
    attributes: Record<string, unknown>;
    relationships?: Record<string, unknown>;
  }>;
  meta?: {
    total_count?: number;
    page_count?: number;
    current_page?: number;
  };
}

export interface ProductiveApiError {
  status: number;
  title: string;
  detail?: string;
}
