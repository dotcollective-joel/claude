import { z } from "zod";

export const ListWebhooksSchema = z.object({
  state_id: z.string().optional().describe("Filter by webhook state (1=Working, 2=Issues, 3=Waiting)"),
  event_id: z.string().optional().describe("Filter by event ID"),
  type_id: z.string().optional().describe("Filter by type (1=Webhook, 2=Zapier)"),
});

export type ListWebhooksInput = z.infer<typeof ListWebhooksSchema>;
