/**
 * Tool-related type definitions
 */

import { z } from "zod";

export interface ToolDefinition {
  name: string;
  description: string;
  schema: z.ZodType<any>;
}

export interface ToolResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
}

export interface Tool {
  name: string;
  description: string;
  schema: z.ZodType<any>;
  getDefinition(): ToolDefinition;
  execute(input: any): Promise<ToolResponse>;
}
