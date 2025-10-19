# Personal Claude Config

Personal configuration and extensions for Claude Desktop, including custom MCP servers and skills.

## Contents

- [Claude Desktop Config](#claude-desktop-config)
- [MCP Servers](#mcp-servers)
- [Skills](#skills)

## Claude Desktop Config

Configuration file for Claude Desktop that integrates custom MCP servers and tools.

It includes configuration for:

### Shopify Dev MCP Server

- Link: https://shopify.dev/docs/apps/build/devmcp

#### Supported API's

The MCP server provides tools to interact with the following Shopify APIs:

- Admin GraphQL API
- Customer Account API
- Functions
- Liquid
- Partner API
- Payment Apps API
- Polaris Web Components
- Storefront API

## Custom MCP Servers

### Productive Tasks

An MCP server that integrates with the Productive.io API to fetch and manage tasks.

**Available Tools:**

#### `get-task`

Retrieves a single task from Productive.io by URL.

**Parameters:**

- Task URL from Productive.io

**Returns:** Task details including title, description, status, and other metadata.

#### `get-tasks`

Retrieves all active tasks from Productive.io.

**Returns:** List of active tasks with their details.

**Environment Variables Required:**

- `PRODUCTIVE_API_TOKEN` - Your Productive.io API token
- `PRODUCTIVE_ORG_ID` - Your Productive.io organization ID

## Skills

### Daily Plans (`get-daily-plans`)

A skill for managing and retrieving daily plans and schedules that generates a Slack message that you can copy/paste into your Squad channel.

**Usage:** Invoke with `what are my daily plans?`
