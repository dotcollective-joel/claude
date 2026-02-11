/**
 * Configuration types for Weather MCP Server
 */

export interface Config {
  server: {
    name: string;
    version: string;
  };
  weather: {
    latitude: string;
    longitude: string;
    timezone?: string;
  };
}
