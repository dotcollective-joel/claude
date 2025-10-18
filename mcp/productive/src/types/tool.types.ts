/**
 * MCP Tool Types
 */

import { z } from "zod";

export interface ToolResponse {
  content: Array<{
    type: "text" | "image" | "resource";
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}

export interface ToolDefinition {
  name: string;
  description: string;
  schema: z.ZodSchema<any>;
}

export interface ToolHandler<TInput = any> {
  (input: TInput): Promise<ToolResponse>;
}

export abstract class Tool<TInput = any> {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly schema: z.ZodSchema<TInput>;

  abstract execute(input: TInput): Promise<ToolResponse>;

  getDefinition(): ToolDefinition {
    return {
      name: this.name,
      description: this.description,
      schema: this.schema,
    };
  }
}

export interface ToolRegistry {
  registerTool(tool: Tool): void;
  getTools(): Tool[];
}
