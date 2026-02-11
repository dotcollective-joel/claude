/**
 * Weather API Client
 * Uses Open-Meteo API for weather data (free, no API key required)
 */

import { OpenMeteoResponse, WeatherForecast } from "../types/weather.types.js";

export class WeatherApiClient {
  private baseUrl = "https://api.open-meteo.com/v1/forecast";

  /**
   * Get weather emoji based on WMO weather code
   * https://open-meteo.com/en/docs
   */
  private getWeatherEmoji(weatherCode: number): string {
    // WMO Weather interpretation codes
    const emojiMap: Record<number, string> = {
      0: "☀️",   // Clear sky
      1: "🌤️",  // Mainly clear
      2: "⛅",   // Partly cloudy
      3: "☁️",   // Overcast
      45: "🌫️", // Fog
      48: "🌫️", // Depositing rime fog
      51: "🌦️", // Light drizzle
      53: "🌦️", // Moderate drizzle
      55: "🌧️", // Dense drizzle
      56: "🌧️", // Light freezing drizzle
      57: "🌧️", // Dense freezing drizzle
      61: "🌧️", // Slight rain
      63: "🌧️", // Moderate rain
      65: "🌧️", // Heavy rain
      66: "🌧️", // Light freezing rain
      67: "🌧️", // Heavy freezing rain
      71: "🌨️", // Slight snow fall
      73: "🌨️", // Moderate snow fall
      75: "❄️",  // Heavy snow fall
      77: "🌨️", // Snow grains
      80: "🌦️", // Slight rain showers
      81: "🌧️", // Moderate rain showers
      82: "⛈️",  // Violent rain showers
      85: "🌨️", // Slight snow showers
      86: "🌨️", // Heavy snow showers
      95: "⛈️",  // Thunderstorm
      96: "⛈️",  // Thunderstorm with slight hail
      99: "⛈️",  // Thunderstorm with heavy hail
    };

    return emojiMap[weatherCode] || "🌤️";
  }

  /**
   * Get weather description based on WMO weather code
   */
  private getWeatherDescription(weatherCode: number): string {
    const descriptionMap: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };

    return descriptionMap[weatherCode] || "Unknown";
  }

  /**
   * Fetch current weather forecast
   */
  async getCurrentWeather(
    latitude: string,
    longitude: string,
    timezone: string = "auto"
  ): Promise<WeatherForecast> {
    const params = new URLSearchParams({
      latitude,
      longitude,
      timezone,
      current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m",
      daily: "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum",
      forecast_days: "1",
    });

    const url = `${this.baseUrl}?${params.toString()}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
      }

      const data: OpenMeteoResponse = await response.json();

      const weatherCode = data.current.weather_code;

      return {
        temperature: Math.round(data.current.temperature_2m),
        weatherCode,
        weatherDescription: this.getWeatherDescription(weatherCode),
        emoji: this.getWeatherEmoji(weatherCode),
        precipitation: data.current.precipitation,
        windSpeed: data.current.wind_speed_10m,
        humidity: data.current.relative_humidity_2m,
        date: data.current.time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch weather: ${error.message}`);
      }
      throw new Error("Failed to fetch weather: Unknown error");
    }
  }
}
