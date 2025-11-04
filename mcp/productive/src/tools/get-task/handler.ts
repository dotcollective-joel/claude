/**
 * Get Task Tool Handler
 */

import { ProductiveApiClient } from "../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../types/tool.types.js";
import { GetTaskInput } from "./schema.js";

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
  input: GetTaskInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const taskId = extractTaskId(input.url);

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

    let output = `# ${task.attributes.title}\n\n`;
    output += `**Task #${task.attributes.task_number}**\n\n`;
    output += `${task.attributes.description || "No description available"}\n\n`;

    if (task.attributes.due_date) {
      output += `**Due Date:** ${task.attributes.due_date}\n`;
    }
    output += `**Status:** ${task.attributes.closed ? "Closed" : "Open"}\n\n`;

    // Fetch subtasks if requested
    if (input.include_subtasks) {
      try {
        const subtasks = await apiClient.getSubtasks(taskId);
        if (subtasks.length > 0) {
          output += `## Subtasks (${subtasks.length})\n\n`;
          subtasks.forEach((subtask) => {
            const status = subtask.attributes.closed ? "✓" : "○";
            output += `${status} **${subtask.attributes.title}**\n`;
            if (subtask.attributes.description) {
              output += `  ${subtask.attributes.description}\n`;
            }
            output += "\n";
          });
        }
      } catch (error) {
        output += `\n_Note: Could not fetch subtasks_\n\n`;
      }
    }

    // Fetch todos if requested
    if (input.include_todos) {
      try {
        const todos = await apiClient.getTodos(taskId);
        if (todos.length > 0) {
          output += `## Checklist Items (${todos.length})\n\n`;
          todos.forEach((todo) => {
            const status = todo.attributes.completed ? "✓" : "○";
            output += `${status} ${todo.attributes.content}\n`;
          });
          output += "\n";
        }
      } catch (error) {
        output += `\n_Note: Could not fetch todos_\n\n`;
      }
    }

    // Fetch comments if requested
    if (input.include_comments) {
      try {
        const comments = await apiClient.getComments(taskId);
        if (comments.length > 0) {
          output += `## Comments (${comments.length})\n\n`;
          comments.forEach((comment) => {
            output += `**${comment.attributes.created_at}**\n`;
            output += `${comment.attributes.content}\n\n`;
          });
        }
      } catch (error) {
        output += `\n_Note: Could not fetch comments_\n\n`;
      }
    }

    return {
      content: [
        {
          type: "text",
          text: output.trim(),
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
