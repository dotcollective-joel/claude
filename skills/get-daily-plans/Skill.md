---
name: "get-daily-plans"
description: "Get tasks from Productive and events from your work calendar to generate a daily plans message to paste into Slack"
---

# Daily Plan Generator

## Instructions

Follow these steps in order:

1. **Get weather emoji**: Call the get_weather tool with format="emoji_only" to get the appropriate emoji for today's weather
2. **Get tasks**: Call the get-tasks tool with only_due_today_or_overdue=true to retrieve ONLY tasks that are due today or overdue. The tool will automatically filter out future tasks and tasks with no due date.
3. **Get calendar events**: Fetch events from my Google Calendar (joel@dotapparel.com.au) for today
4. **Filter calendar events**: EXCLUDE any events that are "out of office" or "focus time" events or events that declined
5. **Generate Slack message**: Create a message in the format below using the weather emoji and only the filtered tasks and events

The Slack message format should be:

---

Morning! {WEATHER_EMOJI}
Plans:

- PROJECT NAME
  - PROJECT TASK NAME
- PROJECT NAME
  - PROJECT TASK NAME

Meetings:

- Meeting 1
- Meeting 2

---

Also, ensure it is outputted in rich text, not markdown/plaintext/code

## Example

- Input: "What are my daily plans?"
- Output: "Morning! ☀️
  Plans:
- Price Attack
  - Purchase Orders
- Olga Berg
  - Staging Environment Setup
- RB Sellars/DAR
  - Gift Voucher Discount Split Issue
  Meetings:
- TroubleShoot Gft Card Issue - Waurn Ponds
- WIP - RB Sellars
- Squad Connect Daily Stand-up"
