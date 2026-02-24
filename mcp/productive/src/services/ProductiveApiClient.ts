/**
 * Productive.io API Client
 * Typed HTTP client for interacting with Productive.io API
 * Supports GET, POST, PATCH, DELETE with pagination and retry logic
 */

import { getConfig } from "../config/index.js";
import {
  HttpMethod,
  RequestOptions,
  JsonApiDocument,
  JsonApiIdentifiable,
  JsonApiResource,
  PaginatedResult,
  PaginationMeta,
} from "../types/common.types.js";
import {
  ProductiveTask,
  ProductiveApiResponse,
  TaskFilters,
  ProductiveProject,
  ProductiveTaskList,
  ProductiveSubtask,
  ProductiveTodo,
  ProductiveComment,
} from "../types/productive.types.js";
import type { ProjectFilters, ProductiveBoard, BoardFilters } from "../types/project.types.js";
import type { ProductivePerson, PeopleFilters } from "../types/person.types.js";
import type { ProductiveCompany, CompanyFilters } from "../types/company.types.js";
import type { ProductiveActivity, ActivityFilters } from "../types/activity.types.js";
import type { ProductiveTimeEntry, TimeEntryFilters } from "../types/time-entry.types.js";
import type { ProductiveBooking, BookingFilters } from "../types/booking.types.js";
import type { ProductiveDeal, DealFilters } from "../types/deal.types.js";
import type { ProductiveInvoice, InvoiceFilters } from "../types/invoice.types.js";
import type { ProductiveService, ServiceFilters } from "../types/service.types.js";
import type { ProductiveExpense, ExpenseFilters } from "../types/expense.types.js";
import type { ProductiveTeam, TeamFilters, ProductiveMembership, MembershipFilters } from "../types/team.types.js";
import type { ProductiveWorkflow, WorkflowFilters, ProductiveWorkflowStatus, WorkflowStatusFilters } from "../types/workflow.types.js";
import type { ProductiveServiceType } from "../types/service.types.js";
import type { ProductiveCustomField, CustomFieldFilters, ProductiveCustomFieldOption, CustomFieldOptionFilters } from "../types/custom-field.types.js";
import type { ProductiveDashboard, DashboardFilters } from "../types/dashboard.types.js";
import type { ProductiveNotification, NotificationFilters } from "../types/notification.types.js";
import type { ProductiveWebhook, WebhookFilters } from "../types/webhook.types.js";
import type { ProductiveDiscussion, DiscussionFilters } from "../types/discussion.types.js";
import type { ProductiveEmail, EmailFilters } from "../types/email.types.js";
import type { ProductiveContract, ContractFilters } from "../types/contract.types.js";
import type { ProductivePayment, PaymentFilters } from "../types/payment.types.js";
import type { ProductivePurchaseOrder, PurchaseOrderFilters } from "../types/purchase-order.types.js";
import type { ProductiveBill, BillFilters } from "../types/bill.types.js";
import type { ProductiveAttachment } from "../types/attachment.types.js";
import type {
  ReportFilters,
  ProductiveReport,
  TimeEntryReportAttributes,
  BudgetReportAttributes,
  ProjectReportAttributes,
  TaskReportAttributes,
  DealReportAttributes,
  CompanyReportAttributes,
  BookingReportAttributes,
  ExpenseReportAttributes,
  InvoiceReportAttributes,
  PaymentReportAttributes,
} from "../types/report.types.js";

const DEFAULT_PAGE_SIZE = 200;
const MAX_PAGES = 10;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1000;

export class ProductiveApiClientError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "ProductiveApiClientError";
  }
}

export class ProductiveApiClient {
  private readonly baseUrl: string;
  private readonly apiToken: string;
  private readonly organizationId: string;

  constructor() {
    const config = getConfig();
    this.baseUrl = config.productive.apiEndpoint;
    this.apiToken = config.productive.apiToken;
    this.organizationId = config.productive.organizationId;
  }

  /**
   * Make a request to the Productive API with retry and rate-limit handling
   */
  async request<T>(
    path: string,
    options?: RequestOptions
  ): Promise<T> {
    if (!path) {
      throw new ProductiveApiClientError("API path is required");
    }

    const method: HttpMethod = options?.method || "GET";
    const url = this.buildUrl(path, options?.params);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const fetchOptions: RequestInit = {
          method,
          headers: {
            "X-Auth-Token": this.apiToken,
            "X-Organization-Id": this.organizationId,
            "Content-Type": "application/vnd.api+json",
          },
        };

        if (options?.body && (method === "POST" || method === "PATCH")) {
          fetchOptions.body = JSON.stringify(options.body);
        }

        const response = await fetch(url, fetchOptions);

        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          const delayMs = retryAfter
            ? parseInt(retryAfter, 10) * 1000
            : INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt);
          await this.sleep(delayMs);
          continue;
        }

        // Handle server errors with retry
        if (response.status >= 500 && attempt < MAX_RETRIES) {
          await this.sleep(INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt));
          continue;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new ProductiveApiClientError(
            `HTTP error! status: ${response.status}`,
            response.status,
            errorData
          );
        }

        // DELETE responses may have no body
        if (response.status === 204) {
          return {} as T;
        }

        return await response.json();
      } catch (error) {
        if (error instanceof ProductiveApiClientError) {
          throw error;
        }
        lastError = error instanceof Error ? error : new Error(String(error));
        if (attempt < MAX_RETRIES) {
          await this.sleep(INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt));
          continue;
        }
      }
    }

    throw new ProductiveApiClientError(
      `Failed to make API request after ${MAX_RETRIES + 1} attempts: ${lastError?.message || "Unknown error"}`,
      undefined,
      lastError
    );
  }

  /**
   * Make a paginated GET request, aggregating results across pages
   */
  async requestPaginated<T extends JsonApiIdentifiable>(
    path: string,
    params?: Record<string, string | number | boolean | string[] | undefined>,
    maxPages: number = MAX_PAGES
  ): Promise<PaginatedResult<T>> {
    const allData: T[] = [];
    let allIncluded: JsonApiResource[] = [];
    let meta: PaginationMeta = {};

    for (let page = 1; page <= maxPages; page++) {
      const paginatedParams = {
        ...params,
        "page[number]": page,
        "page[size]": params?.["page[size]"] || DEFAULT_PAGE_SIZE,
      };

      const response = await this.request<JsonApiDocument<T[]>>(path, {
        params: paginatedParams,
      });

      allData.push(...response.data);

      if (response.included) {
        allIncluded = allIncluded.concat(response.included);
      }

      meta = response.meta || {};

      // Stop if we've fetched all pages
      const totalCount = meta.total_count || 0;
      if (allData.length >= totalCount || response.data.length === 0) {
        break;
      }
    }

    // Deduplicate included resources
    const includedMap = new Map<string, JsonApiResource>();
    for (const resource of allIncluded) {
      includedMap.set(`${resource.type}:${resource.id}`, resource);
    }

    return {
      data: allData,
      included: Array.from(includedMap.values()),
      meta: {
        ...meta,
        total_count: meta.total_count || allData.length,
      },
    };
  }

  // ─── Existing Task Methods ────────────────────────────────────────────

  /**
   * Get a single task by ID
   */
  async getTask(taskId: string): Promise<ProductiveTask> {
    const response = await this.request<ProductiveApiResponse<ProductiveTask>>(
      `/tasks/${taskId}`
    );
    return response.data;
  }

  /**
   * Get a project by ID
   */
  async getProject(projectId: string): Promise<ProductiveProject> {
    const response = await this.request<
      ProductiveApiResponse<ProductiveProject>
    >(`/projects/${projectId}`);
    return response.data;
  }

  /**
   * Get a task list by ID
   */
  async getTaskList(taskListId: string): Promise<ProductiveTaskList> {
    const response = await this.request<
      ProductiveApiResponse<ProductiveTaskList>
    >(`/task_lists/${taskListId}`);
    return response.data;
  }

  /**
   * Get multiple tasks with optional filters
   */
  async getTasks(filters?: TaskFilters): Promise<ProductiveTask[]> {
    const params: Record<string, string | number | boolean | undefined> = {};

    if (filters?.assignee_id) {
      params["filter[assignee_id]"] = filters.assignee_id;
    }
    if (filters?.status !== undefined) {
      params["filter[status]"] = filters.status;
    }
    if (filters?.project_id) {
      params["filter[project_id]"] = filters.project_id;
    }
    if (filters?.due_date) {
      params["filter[due_date]"] = filters.due_date;
    }

    // Include project and task_list relationships
    params["include"] = "project,task_list";

    const response = await this.request<
      ProductiveApiResponse<ProductiveTask[]>
    >("/tasks", { params });
    return response.data;
  }

  /**
   * Get subtasks for a specific task
   */
  async getSubtasks(taskId: string): Promise<ProductiveSubtask[]> {
    const response = await this.request<
      ProductiveApiResponse<ProductiveSubtask[]>
    >(`/tasks/${taskId}/subtasks`);
    return response.data;
  }

  /**
   * Get todos (checklist items) for a specific task
   */
  async getTodos(taskId: string): Promise<ProductiveTodo[]> {
    const response = await this.request<
      ProductiveApiResponse<ProductiveTodo[]>
    >(`/tasks/${taskId}/todos`);
    return response.data;
  }

  /**
   * Get comments for a specific task
   */
  async getComments(taskId: string): Promise<ProductiveComment[]> {
    const response = await this.request<
      ProductiveApiResponse<ProductiveComment[]>
    >(`/tasks/${taskId}/comments`);
    return response.data;
  }

  /**
   * Create a task
   */
  async createTask(body: Record<string, unknown>): Promise<ProductiveTask> {
    const response = await this.request<ProductiveApiResponse<ProductiveTask>>(
      "/tasks",
      { method: "POST", body }
    );
    return response.data;
  }

  /**
   * Update a task
   */
  async updateTask(taskId: string, body: Record<string, unknown>): Promise<ProductiveTask> {
    const response = await this.request<ProductiveApiResponse<ProductiveTask>>(
      `/tasks/${taskId}`,
      { method: "PATCH", body }
    );
    return response.data;
  }

  /**
   * Delete a task
   */
  async deleteTask(taskId: string): Promise<void> {
    await this.request<Record<string, never>>(
      `/tasks/${taskId}`,
      { method: "DELETE" }
    );
  }

  /**
   * Create a todo (checklist item) on a task
   */
  async createTodo(body: Record<string, unknown>): Promise<ProductiveTodo> {
    const response = await this.request<ProductiveApiResponse<ProductiveTodo>>(
      "/todos",
      { method: "POST", body }
    );
    return response.data;
  }

  /**
   * Update a todo (checklist item)
   */
  async updateTodo(todoId: string, body: Record<string, unknown>): Promise<ProductiveTodo> {
    const response = await this.request<ProductiveApiResponse<ProductiveTodo>>(
      `/todos/${todoId}`,
      { method: "PATCH", body }
    );
    return response.data;
  }

  /**
   * Create a comment
   */
  async createComment(body: Record<string, unknown>): Promise<ProductiveComment> {
    const response = await this.request<ProductiveApiResponse<ProductiveComment>>(
      "/comments",
      { method: "POST", body }
    );
    return response.data;
  }

  // ─── Project Methods ───────────────────────────────────────────────────

  /**
   * Create a project
   */
  async createProject(body: Record<string, unknown>): Promise<ProductiveProject> {
    const response = await this.request<ProductiveApiResponse<ProductiveProject>>(
      "/projects",
      { method: "POST", body }
    );
    return response.data;
  }

  /**
   * Update a project
   */
  async updateProject(projectId: string, body: Record<string, unknown>): Promise<ProductiveProject> {
    const response = await this.request<ProductiveApiResponse<ProductiveProject>>(
      `/projects/${projectId}`,
      { method: "PATCH", body }
    );
    return response.data;
  }

  /**
   * Create a task list
   */
  async createTaskList(body: Record<string, unknown>): Promise<ProductiveTaskList> {
    const response = await this.request<ProductiveApiResponse<ProductiveTaskList>>(
      "/task_lists",
      { method: "POST", body }
    );
    return response.data;
  }

  /**
   * Get projects with optional filters
   */
  async getProjects(filters?: ProjectFilters): Promise<PaginatedResult<ProductiveProject>> {
    const params = this.buildFilterParams(filters, [
      "company_id", "responsible_id", "person_id", "status",
      "project_type", "query", "tags",
    ]);
    params["include"] = "company,project_manager";
    return this.requestPaginated<ProductiveProject>("/projects", params);
  }

  // ─── Board Methods ────────────────────────────────────────────────────

  /**
   * Get a board by ID
   */
  async getBoard(boardId: string): Promise<ProductiveBoard> {
    const response = await this.request<ProductiveApiResponse<ProductiveBoard>>(
      `/boards/${boardId}`
    );
    return response.data;
  }

  /**
   * Get boards with optional filters
   */
  async getBoards(filters?: BoardFilters): Promise<PaginatedResult<ProductiveBoard>> {
    const params = this.buildFilterParams(filters, ["project_id", "status"]);
    return this.requestPaginated<ProductiveBoard>("/boards", params);
  }

  // ─── Task List Methods ────────────────────────────────────────────────

  /**
   * Get task lists with optional filters
   */
  async getTaskLists(filters?: { project_id?: string; board_id?: string }): Promise<PaginatedResult<ProductiveTaskList>> {
    const params = this.buildFilterParams(filters, ["project_id", "board_id"]);
    params["include"] = "project,board";
    return this.requestPaginated<ProductiveTaskList>("/task_lists", params);
  }

  // ─── People Methods ───────────────────────────────────────────────────

  /**
   * Get a person by ID
   */
  async getPerson(personId: string): Promise<ProductivePerson> {
    const response = await this.request<ProductiveApiResponse<ProductivePerson>>(
      `/people/${personId}`
    );
    return response.data;
  }

  /**
   * Get people with optional filters
   */
  async getPeople(filters?: PeopleFilters): Promise<PaginatedResult<ProductivePerson>> {
    const params = this.buildFilterParams(filters, [
      "email", "status", "person_type", "role_id", "company_id",
      "team", "query", "tags", "project_id", "manager_id",
    ]);
    params["include"] = "company";
    return this.requestPaginated<ProductivePerson>("/people", params);
  }

  // ─── Company Methods ──────────────────────────────────────────────────

  /**
   * Get a company by ID
   */
  async getCompany(companyId: string): Promise<ProductiveCompany> {
    const response = await this.request<ProductiveApiResponse<ProductiveCompany>>(
      `/companies/${companyId}`
    );
    return response.data;
  }

  /**
   * Get companies with optional filters
   */
  async getCompanies(filters?: CompanyFilters): Promise<PaginatedResult<ProductiveCompany>> {
    const params = this.buildFilterParams(filters, [
      "name", "company_code", "status", "subsidiary_id",
      "project_id", "tags", "query",
    ]);
    return this.requestPaginated<ProductiveCompany>("/companies", params);
  }

  // ─── Activity Methods ─────────────────────────────────────────────────

  /**
   * Get activities (audit log) with optional filters
   */
  async getActivities(filters?: ActivityFilters): Promise<PaginatedResult<ProductiveActivity>> {
    const params = this.buildFilterParams(filters, [
      "person_id", "project_id", "task_id", "deal_id",
      "company_id", "after", "before",
    ]);
    params["include"] = "person";
    return this.requestPaginated<ProductiveActivity>("/activities", params);
  }

  // ─── Time Entry Methods ─────────────────────────────────────────────

  /**
   * Get a time entry by ID
   */
  async getTimeEntry(timeEntryId: string): Promise<ProductiveTimeEntry> {
    const response = await this.request<ProductiveApiResponse<ProductiveTimeEntry>>(
      `/time_entries/${timeEntryId}`,
      { params: { include: "person,service,task" } }
    );
    return response.data;
  }

  /**
   * Get time entries with optional filters
   */
  async getTimeEntries(filters?: TimeEntryFilters): Promise<PaginatedResult<ProductiveTimeEntry>> {
    const params = this.buildFilterParams(filters, [
      "person_id", "project_id", "service_id", "task_id", "deal_id",
      "company_id", "after", "before", "status", "invoiced",
      "billing_type_id", "approved_at",
    ]);
    params["include"] = "person,service,task";
    return this.requestPaginated<ProductiveTimeEntry>("/time_entries", params);
  }

  /**
   * Create a time entry
   */
  async createTimeEntry(body: Record<string, unknown>): Promise<ProductiveTimeEntry> {
    const response = await this.request<ProductiveApiResponse<ProductiveTimeEntry>>(
      "/time_entries",
      { method: "POST", body }
    );
    return response.data;
  }

  /**
   * Update a time entry
   */
  async updateTimeEntry(timeEntryId: string, body: Record<string, unknown>): Promise<ProductiveTimeEntry> {
    const response = await this.request<ProductiveApiResponse<ProductiveTimeEntry>>(
      `/time_entries/${timeEntryId}`,
      { method: "PATCH", body }
    );
    return response.data;
  }

  // ─── Booking Methods ──────────────────────────────────────────────────

  /**
   * Get bookings with optional filters
   */
  async getBookings(filters?: BookingFilters): Promise<PaginatedResult<ProductiveBooking>> {
    const params = this.buildFilterParams(filters, [
      "person_id", "project_id", "company_id", "budget_id",
      "after", "before", "approval_status", "person_type",
      "booking_type", "draft", "canceled",
    ]);
    params["include"] = "person,service";
    return this.requestPaginated<ProductiveBooking>("/bookings", params);
  }

  // ─── Deal Methods ─────────────────────────────────────────────────────

  /**
   * Get a deal by ID
   */
  async getDeal(dealId: string): Promise<ProductiveDeal> {
    const response = await this.request<ProductiveApiResponse<ProductiveDeal>>(
      `/deals/${dealId}`,
      { params: { include: "company,responsible,project" } }
    );
    return response.data;
  }

  /**
   * Get deals with optional filters
   */
  async getDeals(filters?: DealFilters): Promise<PaginatedResult<ProductiveDeal>> {
    const params = this.buildFilterParams(filters, [
      "company_id", "responsible_id", "project_id", "status_id",
      "budget_status", "deal_type_id", "query", "tags",
      "recurring", "pipeline_id",
    ]);
    params["include"] = "company,responsible";
    return this.requestPaginated<ProductiveDeal>("/deals", params);
  }

  // ─── Invoice Methods ──────────────────────────────────────────────────

  /**
   * Get an invoice by ID
   */
  async getInvoice(invoiceId: string): Promise<ProductiveInvoice> {
    const response = await this.request<ProductiveApiResponse<ProductiveInvoice>>(
      `/invoices/${invoiceId}`,
      { params: { include: "company,creator,responsible" } }
    );
    return response.data;
  }

  /**
   * Get invoices with optional filters
   */
  async getInvoices(filters?: InvoiceFilters): Promise<PaginatedResult<ProductiveInvoice>> {
    const params = this.buildFilterParams(filters, [
      "company_id", "deal_id", "project_id", "creator_id",
      "responsible_id", "invoice_state", "invoice_status",
      "payment_status", "sent_status", "currency",
      "invoiced_on_after", "invoiced_on_before", "query",
    ]);
    params["include"] = "company";
    return this.requestPaginated<ProductiveInvoice>("/invoices", params);
  }

  // ─── Service Methods ──────────────────────────────────────────────────

  /**
   * Get a service by ID
   */
  async getService(serviceId: string): Promise<ProductiveService> {
    const response = await this.request<ProductiveApiResponse<ProductiveService>>(
      `/services/${serviceId}`,
      { params: { include: "deal,service_type" } }
    );
    return response.data;
  }

  /**
   * Get services with optional filters
   */
  async getServices(filters?: ServiceFilters): Promise<PaginatedResult<ProductiveService>> {
    const params = this.buildFilterParams(filters, [
      "deal_id", "project_id", "person_id", "name",
      "billing_type", "unit", "budget_status",
      "time_tracking_enabled",
    ]);
    params["include"] = "deal,service_type";
    return this.requestPaginated<ProductiveService>("/services", params);
  }

  // ─── Expense Methods ──────────────────────────────────────────────────

  /**
   * Get expenses with optional filters
   */
  async getExpenses(filters?: ExpenseFilters): Promise<PaginatedResult<ProductiveExpense>> {
    const params = this.buildFilterParams(filters, [
      "service_id", "person_id", "company_id", "project_id",
      "date_after", "date_before", "status", "invoiced",
      "approval_status", "query",
    ]);
    params["include"] = "person,service";
    return this.requestPaginated<ProductiveExpense>("/expenses", params);
  }

  // ─── Team Methods ──────────────────────────────────────────────────

  /**
   * Get teams with optional filters
   */
  async getTeams(filters?: TeamFilters): Promise<PaginatedResult<ProductiveTeam>> {
    const params = this.buildFilterParams(filters, ["name"]);
    return this.requestPaginated<ProductiveTeam>("/teams", params);
  }

  /**
   * Get a team by ID with memberships
   */
  async getTeam(teamId: string): Promise<JsonApiDocument<ProductiveTeam>> {
    return this.request<JsonApiDocument<ProductiveTeam>>(
      `/teams/${teamId}`,
      { params: { include: "memberships" } }
    );
  }

  /**
   * Get memberships with optional filters
   */
  async getMemberships(filters?: MembershipFilters): Promise<PaginatedResult<ProductiveMembership>> {
    const params = this.buildFilterParams(filters, ["team_id", "person_id"]);
    params["include"] = "person,team";
    return this.requestPaginated<ProductiveMembership>("/memberships", params);
  }

  // ─── Workflow Methods ─────────────────────────────────────────────────

  /**
   * Get workflows with optional filters
   */
  async getWorkflows(filters?: WorkflowFilters): Promise<PaginatedResult<ProductiveWorkflow>> {
    const params = this.buildFilterParams(filters, ["name", "archived"]);
    return this.requestPaginated<ProductiveWorkflow>("/workflows", params);
  }

  /**
   * Get a workflow by ID with statuses
   */
  async getWorkflow(workflowId: string): Promise<JsonApiDocument<ProductiveWorkflow>> {
    return this.request<JsonApiDocument<ProductiveWorkflow>>(
      `/workflows/${workflowId}`,
      { params: { include: "workflow_statuses" } }
    );
  }

  /**
   * Get workflow statuses with optional filters
   */
  async getWorkflowStatuses(filters?: WorkflowStatusFilters): Promise<PaginatedResult<ProductiveWorkflowStatus>> {
    const params = this.buildFilterParams(filters, ["workflow_id"]);
    return this.requestPaginated<ProductiveWorkflowStatus>("/workflow_statuses", params);
  }

  // ─── Custom Field Methods ─────────────────────────────────────────────

  /**
   * Get custom fields
   */
  async getCustomFields(filters?: CustomFieldFilters): Promise<PaginatedResult<ProductiveCustomField>> {
    const params = this.buildFilterParams(filters, []);
    return this.requestPaginated<ProductiveCustomField>("/custom_fields", params);
  }

  /**
   * Get a custom field by ID with options
   */
  async getCustomField(customFieldId: string): Promise<JsonApiDocument<ProductiveCustomField>> {
    return this.request<JsonApiDocument<ProductiveCustomField>>(
      `/custom_fields/${customFieldId}`,
      { params: { include: "custom_field_options" } }
    );
  }

  /**
   * Get custom field options with optional filters
   */
  async getCustomFieldOptions(filters?: CustomFieldOptionFilters): Promise<PaginatedResult<ProductiveCustomFieldOption>> {
    const params = this.buildFilterParams(filters, ["custom_field_id"]);
    return this.requestPaginated<ProductiveCustomFieldOption>("/custom_field_options", params);
  }

  // ─── Service Type Methods ─────────────────────────────────────────────

  /**
   * Get service types
   */
  async getServiceTypes(): Promise<PaginatedResult<ProductiveServiceType>> {
    return this.requestPaginated<ProductiveServiceType>("/service_types", {});
  }

  // ─── Dashboard Methods ─────────────────────────────────────────────────

  /**
   * Get dashboards
   */
  async getDashboards(filters?: DashboardFilters): Promise<PaginatedResult<ProductiveDashboard>> {
    const params = this.buildFilterParams(filters, []);
    return this.requestPaginated<ProductiveDashboard>("/dashboards", params);
  }

  // ─── Notification Methods ──────────────────────────────────────────────

  /**
   * Get notifications
   */
  async getNotifications(filters?: NotificationFilters): Promise<PaginatedResult<ProductiveNotification>> {
    const params = this.buildFilterParams(filters, []);
    params["include"] = "person,activity";
    return this.requestPaginated<ProductiveNotification>("/notifications", params);
  }

  // ─── Report Methods ─────────────────────────────────────────────────

  /**
   * Build report filter params (reports use `group` as a top-level param, not filter[group])
   */
  private buildReportParams(filters?: ReportFilters): Record<string, string | number | boolean | string[] | undefined> {
    const params = this.buildFilterParams(filters, [
      "after", "before", "company_id", "project_id", "person_id",
      "budget_id", "deal_id", "service_id", "subsidiary_id",
    ]);
    // `group` is a top-level query param for reports, not a filter
    if (filters?.group) {
      params["group"] = filters.group;
    }
    return params;
  }

  async getTimeEntryReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<TimeEntryReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<TimeEntryReportAttributes>>("/reports/time_entry_reports", this.buildReportParams(filters));
  }

  async getBudgetReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<BudgetReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<BudgetReportAttributes>>("/reports/budget_reports", this.buildReportParams(filters));
  }

  async getProjectReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<ProjectReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<ProjectReportAttributes>>("/reports/project_reports", this.buildReportParams(filters));
  }

  async getTaskReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<TaskReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<TaskReportAttributes>>("/reports/task_reports", this.buildReportParams(filters));
  }

  async getDealReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<DealReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<DealReportAttributes>>("/reports/deal_reports", this.buildReportParams(filters));
  }

  async getCompanyReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<CompanyReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<CompanyReportAttributes>>("/reports/company_reports", this.buildReportParams(filters));
  }

  async getBookingReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<BookingReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<BookingReportAttributes>>("/reports/booking_reports", this.buildReportParams(filters));
  }

  async getExpenseReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<ExpenseReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<ExpenseReportAttributes>>("/reports/expense_reports", this.buildReportParams(filters));
  }

  async getInvoiceReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<InvoiceReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<InvoiceReportAttributes>>("/reports/invoice_reports", this.buildReportParams(filters));
  }

  async getPaymentReports(filters?: ReportFilters): Promise<PaginatedResult<ProductiveReport<PaymentReportAttributes>>> {
    return this.requestPaginated<ProductiveReport<PaymentReportAttributes>>("/reports/payment_reports", this.buildReportParams(filters));
  }

  // ─── Webhook Methods ──────────────────────────────────────────────────

  /**
   * Get webhooks with optional filters
   */
  async getWebhooks(filters?: WebhookFilters): Promise<PaginatedResult<ProductiveWebhook>> {
    const params = this.buildFilterParams(filters, ["state_id", "event_id", "type_id"]);
    return this.requestPaginated<ProductiveWebhook>("/webhooks", params);
  }

  /**
   * Create a webhook
   */
  async createWebhook(body: Record<string, unknown>): Promise<ProductiveWebhook> {
    const response = await this.request<ProductiveApiResponse<ProductiveWebhook>>(
      "/webhooks",
      { method: "POST", body }
    );
    return response.data;
  }

  /**
   * Delete a webhook
   */
  async deleteWebhook(webhookId: string): Promise<void> {
    await this.request<Record<string, never>>(
      `/webhooks/${webhookId}`,
      { method: "DELETE" }
    );
  }

  // ─── Discussion Methods ────────────────────────────────────────────────

  /**
   * Get discussions with optional filters
   */
  async getDiscussions(filters?: DiscussionFilters): Promise<PaginatedResult<ProductiveDiscussion>> {
    const params = this.buildFilterParams(filters, ["person_id", "task_id", "deal_id", "project_id"]);
    params["include"] = "person,task";
    return this.requestPaginated<ProductiveDiscussion>("/discussions", params);
  }

  /**
   * Create a discussion
   */
  async createDiscussion(body: Record<string, unknown>): Promise<ProductiveDiscussion> {
    const response = await this.request<ProductiveApiResponse<ProductiveDiscussion>>(
      "/discussions",
      { method: "POST", body }
    );
    return response.data;
  }

  // ─── Email Methods ─────────────────────────────────────────────────────

  /**
   * Get emails with optional filters
   */
  async getEmails(filters?: EmailFilters): Promise<PaginatedResult<ProductiveEmail>> {
    const params = this.buildFilterParams(filters, ["deal_id"]);
    params["include"] = "deal";
    return this.requestPaginated<ProductiveEmail>("/emails", params);
  }

  // ─── Contract Methods ──────────────────────────────────────────────────

  /**
   * Get contracts with optional filters
   */
  async getContracts(filters?: ContractFilters): Promise<PaginatedResult<ProductiveContract>> {
    const params = this.buildFilterParams(filters, ["company_id", "deal_id", "responsible_id", "query"]);
    params["include"] = "company";
    return this.requestPaginated<ProductiveContract>("/contracts", params);
  }

  // ─── Payment Methods ───────────────────────────────────────────────────

  /**
   * Get payments with optional filters
   */
  async getPayments(filters?: PaymentFilters): Promise<PaginatedResult<ProductivePayment>> {
    const params = this.buildFilterParams(filters, ["company_id", "deal_id", "invoice_id"]);
    params["include"] = "company,invoice";
    return this.requestPaginated<ProductivePayment>("/payments", params);
  }

  // ─── Purchase Order Methods ────────────────────────────────────────────

  /**
   * Get purchase orders with optional filters
   */
  async getPurchaseOrders(filters?: PurchaseOrderFilters): Promise<PaginatedResult<ProductivePurchaseOrder>> {
    const params = this.buildFilterParams(filters, ["company_id", "deal_id", "status", "query"]);
    params["include"] = "company";
    return this.requestPaginated<ProductivePurchaseOrder>("/purchase_orders", params);
  }

  // ─── Bill Methods ──────────────────────────────────────────────────────

  /**
   * Get bills with optional filters
   */
  async getBills(filters?: BillFilters): Promise<PaginatedResult<ProductiveBill>> {
    const params = this.buildFilterParams(filters, ["company_id", "deal_id", "status", "query"]);
    params["include"] = "company";
    return this.requestPaginated<ProductiveBill>("/bills", params);
  }

  // ─── Expense Update Methods ────────────────────────────────────────────

  /**
   * Update an expense
   */
  async updateExpense(expenseId: string, body: Record<string, unknown>): Promise<ProductiveExpense> {
    const response = await this.request<ProductiveApiResponse<ProductiveExpense>>(
      `/expenses/${expenseId}`,
      { method: "PATCH", body }
    );
    return response.data;
  }

  // ─── Booking Create Methods ────────────────────────────────────────────

  /**
   * Create a booking
   */
  async createBooking(body: Record<string, unknown>): Promise<ProductiveBooking> {
    const response = await this.request<ProductiveApiResponse<ProductiveBooking>>(
      "/bookings",
      { method: "POST", body }
    );
    return response.data;
  }

  // ─── Attachment Methods ────────────────────────────────────────────────

  /**
   * Create an attachment
   */
  async createAttachment(body: Record<string, unknown>): Promise<ProductiveAttachment> {
    const response = await this.request<ProductiveApiResponse<ProductiveAttachment>>(
      "/attachments",
      { method: "POST", body }
    );
    return response.data;
  }

  // ─── Private Helpers ──────────────────────────────────────────────────

  /**
   * Build a full URL with query parameters
   */
  private buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | string[] | undefined>
  ): string {
    const base = `${this.baseUrl}${path}`;
    if (!params) return base;

    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) {
        searchParams.append(key, value.join(","));
      } else {
        searchParams.append(key, String(value));
      }
    }

    const query = searchParams.toString();
    return query ? `${base}?${query}` : base;
  }

  /**
   * Build filter params from a filters object, mapping known keys to filter[key] format
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildFilterParams<T extends Record<string, any>>(
    filters: T | undefined,
    filterKeys: string[]
  ): Record<string, string | number | boolean | string[] | undefined> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (!filters) return params;

    for (const key of filterKeys) {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        params[`filter[${key}]`] = value as string | number | boolean;
      }
    }

    // Pass through sort and pagination if present
    if (filters.sort) {
      params["sort"] = filters.sort as string;
    }

    return params;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
