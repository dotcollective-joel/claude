import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListEmailsInput } from "./schema.js";
import { ProductiveEmail } from "../../../types/email.types.js";
import { formatCountSummary, formatDate } from "../../../utils/formatters.js";

function formatEmail(email: ProductiveEmail): string {
  const attrs = email.attributes;
  let output = `**${attrs.subject || "No Subject"}** (ID: ${email.id})`;
  if (attrs.from) output += `\n  From: ${attrs.from}`;
  if (attrs.to) output += ` | To: ${attrs.to}`;
  output += ` | Sent: ${formatDate(attrs.sent_at)}`;
  output += ` | Created: ${formatDate(attrs.created_at)}`;
  return output;
}

export async function handleListEmails(
  input: ListEmailsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getEmails(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No emails found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "email");
    const lines = result.data.map((e) => formatEmail(e));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve emails: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
