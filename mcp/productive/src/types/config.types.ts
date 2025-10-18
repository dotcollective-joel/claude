/**
 * Configuration Types
 */

export interface ProductiveConfig {
  apiEndpoint: string;
  apiToken: string;
  organizationId: string;
  userId: string;
}

export interface ServerConfig {
  name: string;
  version: string;
}

export interface Config {
  server: ServerConfig;
  productive: ProductiveConfig;
}
