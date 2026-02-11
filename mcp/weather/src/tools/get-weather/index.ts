/**
 * Get Weather Tool
 * Retrieves current weather forecast with emoji
 */

import { BaseTool } from "../base/BaseTool.js";
import { WeatherApiClient } from "../../services/WeatherApiClient.js";
import { ToolResponse } from "../../types/tool.types.js";
import { GetWeatherSchema, GetWeatherInput } from "./schema.js";
import { handleGetWeather } from "./handler.js";

export class GetWeatherTool extends BaseTool<GetWeatherInput> {
  readonly name = "get_weather";
  readonly description = "Get current weather forecast with appropriate emoji based on conditions";
  readonly schema = GetWeatherSchema;

  private apiClient: WeatherApiClient;

  constructor(apiClient?: WeatherApiClient) {
    super();
    this.apiClient = apiClient || new WeatherApiClient();
  }

  async execute(input: GetWeatherInput): Promise<ToolResponse> {
    return handleGetWeather(this.apiClient, input.format || "text");
  }
}
