import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListBoardsInput } from "./schema.js";
import { formatCountSummary } from "../../../utils/formatters.js";
import { ProductiveBoard } from "../../../types/project.types.js";

function formatBoard(board: ProductiveBoard): string {
  const attrs = board.attributes;
  const status = attrs.archived_at ? " (Archived)" : "";
  const hidden = attrs.hidden ? " [Hidden]" : "";
  return `- **${attrs.name}**${status}${hidden} (ID: ${board.id})`;
}

export async function handleListBoards(
  input: ListBoardsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getBoards(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No boards found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "board");
    const lines = result.data.map(formatBoard);

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve boards: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
