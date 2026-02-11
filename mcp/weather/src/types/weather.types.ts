/**
 * Weather API types
 */

export interface WeatherForecast {
  temperature: number;
  weatherCode: number;
  weatherDescription: string;
  emoji: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
  date: string;
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
  };
}
