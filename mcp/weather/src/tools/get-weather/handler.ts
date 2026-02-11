/**
 * Get Weather Handler
 */

import { WeatherApiClient } from "../../services/WeatherApiClient.js";
import { ToolResponse } from "../../types/tool.types.js";
import { getConfig } from "../../config/index.js";

export async function handleGetWeather(
  apiClient: WeatherApiClient,
  format: "text" | "emoji_only" | "json" = "text"
): Promise<ToolResponse> {
  try {
    const config = getConfig();
    const forecast = await apiClient.getCurrentWeather(
      config.weather.latitude,
      config.weather.longitude,
      config.weather.timezone
    );

    let responseText: string;

    switch (format) {
      case "emoji_only":
        responseText = forecast.emoji;
        break;

      case "json":
        responseText = JSON.stringify(forecast, null, 2);
        break;

      case "text":
      default:
        responseText = `${forecast.emoji} ${forecast.weatherDescription}
Temperature: ${forecast.temperature}°C
Humidity: ${forecast.humidity}%
Wind: ${forecast.windSpeed} km/h
Precipitation: ${forecast.precipitation}mm`;
        break;
    }

    return {
      content: [
        {
          type: "text",
          text: responseText,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error fetching weather: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ],
      isError: true,
    };
  }
}
