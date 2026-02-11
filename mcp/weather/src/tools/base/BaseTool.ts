/**
 * Base Tool Class
 * Provides common functionality for all tools
 */

import { z } from "zod";
import { Tool, ToolDefinition, ToolResponse } from "../../types/tool.types.js";

export abstract class BaseTool<TInput = any> implements Tool {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly schema: z.ZodType<TInput>;

  getDefinition(): ToolDefinition {
    return {
      name: this.name,
      description: this.description,
      schema: this.schema,
    };
  }

  abstract execute(input: TInput): Promise<ToolResponse>;

  protected createResponse(text: string, isError = false): ToolResponse {
    return {
      content: [
        {
          type: "text",
          text,
        },
      ],
      isError,
    };
  }

  protected createErrorResponse(error: Error): ToolResponse {
    return this.createResponse(
      `Error: ${error.message}`,
      true
    );
  }
}
