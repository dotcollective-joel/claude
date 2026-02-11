/**
 * Configuration Management
 */

import { Config } from "../types/config.types.js";

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new ConfigurationError(
      `Missing required environment variable: ${key}`
    );
  }
  return value;
}

export function loadConfig(): Config {
  return {
    server: {
      name: "weather",
      version: "1.0.0",
    },
    weather: {
      latitude: getEnvVar("WEATHER_LATITUDE"),
      longitude: getEnvVar("WEATHER_LONGITUDE"),
      timezone: getEnvVar("WEATHER_TIMEZONE", "auto"),
    },
  };
}

let configInstance: Config | null = null;

export function getConfig(): Config {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}
