import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListNotificationsInput } from "./schema.js";
import { ProductiveNotification } from "../../../types/notification.types.js";
import { formatCountSummary, formatDate } from "../../../utils/formatters.js";

function formatNotification(notification: ProductiveNotification): string {
  const attrs = notification.attributes;
  let output = `**${attrs.notification_type}** (ID: ${notification.id})`;
  output += ` | Read: ${attrs.read_at ? formatDate(attrs.read_at) : "Unread"}`;
  output += ` | Created: ${formatDate(attrs.created_at)}`;
  return output;
}

export async function handleListNotifications(
  _input: ListNotificationsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getNotifications();

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No notifications found." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "notification");
    const lines = result.data.map((n) => formatNotification(n));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Failed to retrieve notifications: ${error instanceof Error ? error.message : "Unknown error"}` }],
      isError: true,
    };
  }
}
