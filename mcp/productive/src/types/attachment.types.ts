/**
 * Attachment-related Types
 */

import { JsonApiRelationship } from "./common.types.js";

export interface AttachmentAttributes {
  name: string;
  content_type: string | null;
  byte_size: number | null;
  url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AttachmentRelationships {
  attachable?: JsonApiRelationship;
  creator?: JsonApiRelationship;
  organization?: JsonApiRelationship;
}

export interface ProductiveAttachment {
  id: string;
  type: string;
  attributes: AttachmentAttributes;
  relationships?: AttachmentRelationships;
}

export interface CreateAttachmentInput {
  name: string;
  attachable_id: string;
  attachable_type: string;
  url?: string;
}
