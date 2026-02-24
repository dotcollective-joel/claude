import { z } from "zod";

export const CreateAttachmentSchema = z.object({
  name: z.string().describe("Name of the attachment"),
  attachable_id: z.string().describe("ID of the resource to attach to"),
  attachable_type: z.string().describe("Type of the resource to attach to (e.g. 'tasks', 'deals', 'projects')"),
  url: z.string().optional().describe("Optional URL of the file to attach"),
});

export type CreateAttachmentInput = z.infer<typeof CreateAttachmentSchema>;
