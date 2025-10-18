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
      name: "productive.io",
      version: "1.0.0",
    },
    productive: {
      apiEndpoint: "https://api.productive.io/api/v2",
      apiToken: getEnvVar("PRODUCTIVE_API_TOKEN"),
      organizationId: getEnvVar("PRODUCTIVE_ORGANIZATION_ID"),
      userId: getEnvVar("PRODUCTIVE_USER_ID"),
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
