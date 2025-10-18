/**
 * Get Tasks Tool Handler
 */

import { ProductiveApiClient } from "../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../types/tool.types.js";
import { ProductiveTask, TaskFilters } from "../../types/productive.types.js";

async function formatTask(
  task: ProductiveTask,
  apiClient: ProductiveApiClient
): Promise<string> {
  let projectName = "No project";
  let taskListName = "No task list";

  // Fetch project if it exists in relationships
  if (task.relationships?.project?.data?.id) {
    try {
      const project = await apiClient.getProject(task.relationships.project.data.id);
      projectName = project.attributes.name;
    } catch (error) {
      projectName = `Error fetching project (ID: ${task.relationships.project.data.id})`;
    }
  }

  // Fetch task list if it exists in relationships
  if (task.relationships?.task_list?.data?.id) {
    try {
      const taskList = await apiClient.getTaskList(task.relationships.task_list.data.id);
      taskListName = taskList.attributes.name;
    } catch (error) {
      taskListName = `Error fetching task list (ID: ${task.relationships.task_list.data.id})`;
    }
  }

  return `Task #${task.attributes.task_number}: ${task.attributes.title}
Description: ${task.attributes.description || "No description"}
Due Date: ${task.attributes.due_date || "Not set"}
Status: ${task.attributes.closed ? "Closed" : "Open"}
Project: ${projectName}
Task List: ${taskListName}
---`;
}

export async function handleGetTasks(
  filters: TaskFilters,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const tasks = await apiClient.getTasks(filters);

    if (!tasks || tasks.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No tasks found matching the specified filters.",
          },
        ],
      };
    }

    // Format all tasks (with async calls to fetch project and task_list)
    const formattedTasks = await Promise.all(
      tasks.map(task => formatTask(task, apiClient))
    );
    const tasksText = formattedTasks.join("\n");

    return {
      content: [
        {
          type: "text",
          text: `Found ${tasks.length} task${tasks.length === 1 ? "" : "s"}:\n\n${tasksText}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Failed to retrieve tasks: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ],
      isError: true,
    };
  }
}
