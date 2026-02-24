import { z } from "zod";

export const DeleteWebhookSchema = z.object({
  webhook_id: z.string().describe("The ID of the webhook to delete"),
});

export type DeleteWebhookInput = z.infer<typeof DeleteWebhookSchema>;
