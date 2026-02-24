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
  async requestPaginated<T extends JsonApiResource>(
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

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
