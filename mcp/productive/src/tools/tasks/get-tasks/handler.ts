/**
 * Get Tasks Tool Handler
 */

import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ProductiveTask, TaskFilters } from "../../../types/productive.types.js";

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
    } catch {
      projectName = `Error fetching project (ID: ${task.relationships.project.data.id})`;
    }
  }

  // Fetch task list if it exists in relationships
  if (task.relationships?.task_list?.data?.id) {
    try {
      const taskList = await apiClient.getTaskList(task.relationships.task_list.data.id);
      taskListName = taskList.attributes.name;
    } catch {
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
  apiClient: ProductiveApiClient,
  format: 'text' | 'json' = 'text',
  onlyDueTodayOrOverdue: boolean = false
): Promise<ToolResponse> {
  try {
    let tasks = await apiClient.getTasks(filters);

    // Client-side filtering for due date if requested
    if (onlyDueTodayOrOverdue) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      tasks = tasks.filter(task => {
        if (!task.attributes.due_date) {
          return false; // Exclude tasks with no due date
        }

        const dueDate = new Date(task.attributes.due_date);
        dueDate.setHours(0, 0, 0, 0);

        // Include if due date is today or in the past
        return dueDate <= today;
      });
    }

    if (!tasks || tasks.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: format === 'json'
              ? JSON.stringify({ tasks: [], count: 0 }, null, 2)
              : "No tasks found matching the specified filters.",
          },
        ],
      };
    }

    if (format === 'json') {
      // Return structured JSON data with project and task list info
      const tasksWithDetails = await Promise.all(
        tasks.map(async (task) => {
          let projectName = "No project";
          let taskListName = "No task list";

          if (task.relationships?.project?.data?.id) {
            try {
              const project = await apiClient.getProject(task.relationships.project.data.id);
              projectName = project.attributes.name;
            } catch {
              projectName = `Error fetching project (ID: ${task.relationships.project.data.id})`;
            }
          }

          if (task.relationships?.task_list?.data?.id) {
            try {
              const taskList = await apiClient.getTaskList(task.relationships.task_list.data.id);
              taskListName = taskList.attributes.name;
            } catch {
              taskListName = `Error fetching task list (ID: ${task.relationships.task_list.data.id})`;
            }
          }

          return {
            id: task.id,
            task_number: task.attributes.task_number,
            title: task.attributes.title,
            description: task.attributes.description || null,
            due_date: task.attributes.due_date || null,
            closed: task.attributes.closed,
            project: projectName,
            task_list: taskListName,
          };
        })
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ tasks: tasksWithDetails, count: tasksWithDetails.length }, null, 2),
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
