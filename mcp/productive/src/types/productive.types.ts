/**
 * Productive.io API Types
 */

export interface ProductiveTask {
  id: string;
  type: string;
  attributes: {
    task_number: number;
    title: string;
    description: string | null;
    due_date: string | null;
    closed: boolean;
    created_at: string;
    updated_at: string;
  };
  relationships?: {
    assignee?: {
      data: {
        id: string;
        type: string;
      } | null;
    };
    project?: {
      data: {
        id: string;
        type: string;
      } | null;
    };
    task_list?: {
      data: {
        id: string;
        type: string;
      } | null;
    };
  };
}

export interface ProductiveApiResponse<T> {
  data: T;
  included?: any[];
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

export enum TaskStatus {
  Open = 1,
  Closed = 2,
}

export interface TaskFilters {
  assignee_id?: string;
  status?: TaskStatus;
  project_id?: string;
  due_date?: string;
}

export interface ProductiveProject {
  id: string;
  type: string;
  attributes: {
    name: string;
    description?: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface ProductiveTaskList {
  id: string;
  type: string;
  attributes: {
    name: string;
    created_at: string;
    updated_at: string;
  };
}
