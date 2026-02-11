# Weather MCP Server

A Model Context Protocol (MCP) server that provides current weather forecasts with appropriate emoji representations based on weather conditions.

## Features

- 🌤️ Real-time weather data using Open-Meteo API (free, no API key required)
- 🎨 Automatic emoji selection based on weather conditions
- 📍 Location-based forecasts using latitude/longitude
- 🔧 Multiple output formats (text, emoji only, JSON)

## Installation

```bash
cd mcp/weather
npm install
npm run build
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your location coordinates:
```env
WEATHER_LATITUDE=your_latitude
WEATHER_LONGITUDE=your_longitude
WEATHER_TIMEZONE=your_timezone  # e.g., Australia/Melbourne
```

You can find your coordinates at [latlong.net](https://www.latlong.net/)

## Usage

### As an MCP Server

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/path/to/claude/mcp/weather/build/index.js"],
      "env": {
        "WEATHER_LATITUDE": "your_latitude",
        "WEATHER_LONGITUDE": "your_longitude",
        "WEATHER_TIMEZONE": "your_timezone"
      }
    }
  }
}
```

### Available Tools

#### `get_weather`

Get current weather forecast with emoji.

**Parameters:**
- `format` (optional): Response format
  - `"text"` (default): Full weather details with emoji
  - `"emoji_only"`: Just the weather emoji
  - `"json"`: Complete data in JSON format

**Example responses:**

Text format:
```
☀️ Clear sky
Temperature: 22°C
Humidity: 65%
Wind: 15 km/h
Precipitation: 0mm
```

Emoji only:
```
☀️
```

## Weather Emoji Mapping

The server uses WMO Weather Interpretation Codes to map conditions to emojis:

- ☀️ Clear sky
- 🌤️ Mainly clear / Partly cloudy
- ⛅ Partly cloudy
- ☁️ Overcast
- 🌫️ Foggy
- 🌦️ Light rain/drizzle
- 🌧️ Rain
- 🌨️ Snow
- ❄️ Heavy snow
- ⛈️ Thunderstorm

## API

Uses the [Open-Meteo API](https://open-meteo.com/) for weather data. No API key required.

## License

MIT
