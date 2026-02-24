import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { GetBoardInput } from "./schema.js";
import { resolveId } from "../../../utils/url.js";

export async function handleGetBoard(
  input: GetBoardInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const boardId = resolveId(input.board_id, "boards");

    if (!boardId) {
      return {
        content: [{ type: "text", text: "Invalid board ID or URL format." }],
        isError: true,
      };
    }

    const board = await apiClient.getBoard(boardId);
    const attrs = board.attributes;

    let output = `# ${attrs.name}\n\n`;
    output += `**Board ID:** ${board.id}\n`;
    output += `**Position:** ${attrs.position}\n`;
    if (attrs.hidden) output += `**Hidden:** Yes\n`;
    if (attrs.archived_at) output += `**Archived:** ${attrs.archived_at}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve board: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
