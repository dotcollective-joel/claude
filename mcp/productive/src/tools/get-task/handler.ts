/**
 * Get Task Tool Handler
 */

import { ProductiveApiClient } from "../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../types/tool.types.js";

/**
 * Extract task ID from a Productive.io task URL
 * @param url - Full task URL from Productive.io
 * @returns Task ID or null if invalid format
 */
function extractTaskId(url: string): string | null {
  if (!url) {
    return null;
  }

  // Match pattern: https://app.productive.io/{org-id}/tasks/{task-id}
  const match = url.match(/\/tasks\/(\d+)/);
  return match ? match[1] : null;
}

export async function handleGetTask(
  url: string,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const taskId = extractTaskId(url);

    if (!taskId) {
      return {
        content: [
          {
            type: "text",
            text: "Invalid task URL format. Expected format: https://app.productive.io/{org-id}/tasks/{task-id}",
          },
        ],
        isError: true,
      };
    }

    const task = await apiClient.getTask(taskId);

    return {
      content: [
        {
          type: "text",
          text: task.attributes.description || "No description available",
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Failed to retrieve task: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ],
      isError: true,
    };
  }
}
