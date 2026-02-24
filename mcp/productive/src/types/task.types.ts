/**
 * Task-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface TaskAttributes {
  task_number: number;
  title: string;
  description: string | null;
  due_date: string | null;
  start_date: string | null;
  closed: boolean;
  initial_estimate: number | null;
  remaining_time: number | null;
  worked_time: number | null;
  billable_time: number | null;
  private: boolean;
  repeat_on_interval: number | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  last_activity_at: string | null;
}

export interface TaskRelationships {
  assignee?: JsonApiRelationship;
  project?: JsonApiRelationship;
  task_list?: JsonApiRelationship;
  parent_task?: JsonApiRelationship;
  workflow_status?: JsonApiRelationship;
  creator?: JsonApiRelationship;
  last_actor?: JsonApiRelationship;
  service?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveTask {
  id: string;
  type: string;
  attributes: TaskAttributes;
  relationships?: TaskRelationships;
}

export interface SubtaskAttributes {
  task_number?: number;
  title: string;
  description: string | null;
  due_date: string | null;
  closed: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductiveSubtask {
  id: string;
  type: string;
  attributes: SubtaskAttributes;
  relationships?: {
    parent_task?: JsonApiRelationship;
    assignee?: JsonApiRelationship;
  };
}

export interface TodoAttributes {
  content: string;
  completed: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface ProductiveTodo {
  id: string;
  type: string;
  attributes: TodoAttributes;
  relationships?: {
    task?: JsonApiRelationship;
  };
}

export interface CommentAttributes {
  content: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductiveComment {
  id: string;
  type: string;
  attributes: CommentAttributes;
  relationships?: {
    task?: JsonApiRelationship;
    person?: JsonApiRelationship;
    creator?: JsonApiRelationship;
  };
}

export interface TaskListAttributes {
  name: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface ProductiveTaskList {
  id: string;
  type: string;
  attributes: TaskListAttributes;
  relationships?: {
    project?: JsonApiRelationship;
    board?: JsonApiRelationship;
  };
}

export enum TaskStatus {
  Open = 1,
  Closed = 2,
}

export interface TaskFilters extends BaseFilters {
  assignee_id?: string;
  status?: TaskStatus;
  project_id?: string;
  task_list_id?: string;
  due_date?: string;
  due_date_after?: string;
  due_date_before?: string;
  workflow_status_id?: string;
  workflow_status_category_id?: string;
  company_id?: string;
  board_id?: string;
  query?: string;
  tags?: string;
  task_type?: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  due_date?: string;
  start_date?: string;
  initial_estimate?: number;
  private?: boolean;
  project_id: string;
  task_list_id?: string;
  assignee_id?: string;
  workflow_status_id?: string;
  parent_task_id?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  due_date?: string | null;
  start_date?: string | null;
  initial_estimate?: number | null;
  remaining_time?: number | null;
  closed?: boolean;
  assignee_id?: string | null;
  workflow_status_id?: string;
  task_list_id?: string;
}
