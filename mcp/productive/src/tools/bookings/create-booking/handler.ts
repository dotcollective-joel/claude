import { ProductiveApiClient } from "../../../services/ProductiveApiClient.js";
import { ToolResponse } from "../../../types/tool.types.js";
import { CreateBookingInput } from "./schema.js";
import { buildJsonApiBody } from "../../../utils/jsonapi.js";
import { formatDate, formatMinutes } from "../../../utils/formatters.js";

export async function handleCreateBooking(
  input: CreateBookingInput,
  apiClient: ProductiveApiClient
): Promise<ToolResponse> {
  try {
    const attributes: Record<string, unknown> = {
      started_on: input.started_on,
      ended_on: input.ended_on,
    };

    if (input.time !== undefined) attributes.time = input.time;
    if (input.percentage !== undefined) attributes.percentage = input.percentage;
    if (input.note !== undefined) attributes.note = input.note;

    const relationships: Record<string, { type: string; id: string }> = {
      person: { type: "people", id: input.person_id },
      service: { type: "services", id: input.service_id },
    };

    const body = buildJsonApiBody("bookings", attributes, relationships);
    const booking = await apiClient.createBooking(body);
    const attrs = booking.attributes;

    let output = `Booking created successfully.\n\n`;
    output += `**ID:** ${booking.id}\n`;
    output += `**Period:** ${formatDate(attrs.started_on)} to ${formatDate(attrs.ended_on)}\n`;
    if (attrs.time !== null) output += `**Time:** ${formatMinutes(attrs.time)}\n`;
    if (attrs.percentage !== null) output += `**Percentage:** ${attrs.percentage}%\n`;
    if (attrs.note) output += `**Note:** ${attrs.note}\n`;

    return { content: [{ type: "text", text: output.trim() }] };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to create booking: ${error instanceof Error ? error.message : "Unknown error"}`,
      }],
      isError: true,
    };
  }
}
