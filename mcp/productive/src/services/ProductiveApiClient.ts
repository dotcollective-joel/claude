/**
 * Productive.io API Client
 * Typed HTTP client for interacting with Productive.io API
 */

import { getConfig } from "../config/index.js";
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

export class ProductiveApiClientError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: any
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
   * Make a GET request to the Productive API
   */
  private async request<T>(path: string): Promise<T> {
    if (!path) {
      throw new ProductiveApiClientError("API path is required");
    }

    const url = `${this.baseUrl}${path}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Auth-Token": this.apiToken,
          "X-Organization-Id": this.organizationId,
          "Content-Type": "application/vnd.api+json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ProductiveApiClientError(
          `HTTP error! status: ${response.status}`,
          response.status,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ProductiveApiClientError) {
        throw error;
      }
      throw new ProductiveApiClientError(
        `Failed to make API request: ${error instanceof Error ? error.message : "Unknown error"}`,
        undefined,
        error
      );
    }
  }

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
    const response = await this.request<ProductiveApiResponse<ProductiveProject>>(
      `/projects/${projectId}`
    );
    return response.data;
  }

  /**
   * Get a task list by ID
   */
  async getTaskList(taskListId: string): Promise<ProductiveTaskList> {
    const response = await this.request<ProductiveApiResponse<ProductiveTaskList>>(
      `/task_lists/${taskListId}`
    );
    return response.data;
  }

  /**
   * Get multiple tasks with optional filters
   */
  async getTasks(filters?: TaskFilters): Promise<ProductiveTask[]> {
    const queryParams = new URLSearchParams();

    if (filters?.assignee_id) {
      queryParams.append("filter[assignee_id]", filters.assignee_id);
    }
    if (filters?.status !== undefined) {
      queryParams.append("filter[status]", filters.status.toString());
    }
    if (filters?.project_id) {
      queryParams.append("filter[project_id]", filters.project_id);
    }
    if (filters?.due_date) {
      queryParams.append("filter[due_date]", filters.due_date);
    }

    // Include project and task_list relationships
    queryParams.append("include", "project,task_list");

    const query = queryParams.toString();
    const path = `/tasks${query ? `?${query}` : ""}`;

    const response = await this.request<
      ProductiveApiResponse<ProductiveTask[]>
    >(path);
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
}
