import { z } from "zod";

export const CreateWebhookSchema = z.object({
  target_url: z.string().describe("URL to receive webhook payloads"),
  event_id: z.number().describe("Event type ID (e.g. 1=TaskCreated, 6=TimeEntryCreated, 24=TaskUpdated)"),
  name: z.string().optional().describe("Optional name for the webhook"),
  type_id: z.number().optional().describe("Webhook type (1=Webhook, 2=Zapier). Defaults to 1"),
  custom_headers: z.record(z.string()).optional().describe("Optional custom headers as key-value pairs"),
});

export type CreateWebhookInput = z.infer<typeof CreateWebhookSchema>;
