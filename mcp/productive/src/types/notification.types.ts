/**
 * Notification-related Types
 */

import { JsonApiRelationship, BaseFilters } from "./common.types.js";

export interface NotificationAttributes {
  notification_type: string;
  read_at: string | null;
  created_at: string;
}

export interface ProductiveNotification {
  id: string;
  type: string;
  attributes: NotificationAttributes;
  relationships?: {
    person?: JsonApiRelationship;
    activity?: JsonApiRelationship;
    target?: JsonApiRelationship;
    organization?: JsonApiRelationship;
  };
}

export interface NotificationFilters extends BaseFilters {
  // No documented filters beyond pagination
}
