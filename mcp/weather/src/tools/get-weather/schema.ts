/**
 * Get Weather Tool Schema
 */

import { z } from "zod";

export const GetWeatherSchema = z.object({
  format: z
    .enum(["text", "emoji_only", "json"])
    .optional()
    .describe("Response format: text (default), emoji_only, or json"),
});

export type GetWeatherInput = z.infer<typeof GetWeatherSchema>;
