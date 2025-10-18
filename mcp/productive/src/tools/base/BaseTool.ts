/**
 * Base Tool Abstract Class
 * All tools should extend this class to ensure consistent behavior
 */

import { z } from "zod";
import { Tool, ToolResponse } from "../../types/tool.types.js";

export abstract class BaseTool<TInput = any> implements Tool<TInput> {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly schema: z.ZodSchema<TInput>;

  /**
   * Execute the tool with the given input
   */
  abstract execute(input: TInput): Promise<ToolResponse>;

  /**
   * Create a successful text response
   */
  protected createTextResponse(text: string): ToolResponse {
    return {
      content: [
        {
          type: "text",
          text,
        },
      ],
    };
  }

  /**
   * Create an error response
   */
  protected createErrorResponse(message: string): ToolResponse {
    return {
      content: [
        {
          type: "text",
          text: message,
        },
      ],
      isError: true,
    };
  }

  /**
   * Get tool definition for registration
   */
  getDefinition() {
    return {
      name: this.name,
      description: this.description,
      schema: this.schema,
    };
  }
}
