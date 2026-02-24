import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { ListBookingsInput } from "./schema.js";
import { ProductiveBooking } from "../../../types/booking.types.js";
import { resolveIncludedName } from "../../../utils/jsonapi.js";
import { formatCountSummary, formatDate, formatMinutes } from "../../../utils/formatters.js";
import { JsonApiResource } from "../../../types/common.types.js";

function formatBooking(booking: ProductiveBooking, included?: JsonApiResource[]): string {
  const attrs = booking.attributes;
  const personName = resolveIncludedName(
    included, "people",
    booking.relationships?.person?.data?.id,
    "Unknown"
  );
  const serviceName = resolveIncludedName(
    included, "services",
    booking.relationships?.service?.data?.id,
    "No service"
  );

  let output = `**${personName}** — ${formatDate(attrs.started_on)} to ${formatDate(attrs.ended_on)}\n`;
  output += `  Service: ${serviceName}`;
  if (attrs.time !== null) output += ` | Time: ${formatMinutes(attrs.time)}`;
  if (attrs.percentage !== null) output += ` | ${attrs.percentage}%`;
  output += ` | Approved: ${attrs.approved ? "Yes" : "No"}`;
  if (attrs.draft) output += ` | Draft`;
  if (attrs.canceled) output += ` | Canceled`;
  return output;
}

export async function handleListBookings(
  input: ListBookingsInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const result = await apiClient.getBookings(input);

    if (result.data.length === 0) {
      return { content: [{ type: "text", text: "No bookings found matching the specified filters." }] };
    }

    const header = formatCountSummary(result.meta.total_count || result.data.length, "booking");
    const lines = result.data.map((b) => formatBooking(b, result.included));

    return { content: [{ type: "text", text: `${header}:\n\n${lines.join("\n\n")}` }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to retrieve bookings: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
