/**
 * Workflow-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface WorkflowAttributes {
  name: string;
  archived_at: string | null;
}

export interface ProductiveWorkflow {
  id: string;
  type: string;
  attributes: WorkflowAttributes;
  relationships?: {
    organization?: JsonApiRelationship;
  };
}

export interface WorkflowFilters extends BaseFilters {
  name?: string;
  archived?: string;
}

export interface WorkflowStatusAttributes {
  name: string;
  category_id: number;
  position: number;
  color: string | null;
}

export interface ProductiveWorkflowStatus {
  id: string;
  type: string;
  attributes: WorkflowStatusAttributes;
  relationships?: {
    workflow?: JsonApiRelationship;
    organization?: JsonApiRelationship;
  };
}

export interface WorkflowStatusFilters extends BaseFilters {
  workflow_id?: string;
}
