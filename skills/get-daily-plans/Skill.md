---
name: "get-daily-plans"
description: "Get tasks from Productive and events from your work calendar to generate a daily plans message to paste into Slack"
---

# Daily Plan Generator

## Instructions

You should get tasks from Productive using the get-tasks tool. This will grab the tasks that are assigned to me from Productive.io and output the correct data. As well as this, you should also grab my events from my Google Calendar, ensuring you are only grabbing "Work" events (joel@dotapparel.com.au) with events that are not an out of office or focus time.

Then once you have gotten them, generate a Slack message I can post myself, it should be laid out like this:

Morning! 🤠
Plans:

- PROJECT NAME
  - PROJECT TASK NAME
- PROJECT NAME
  - PROJECT TASK NAME
    Meetings:
- Meeting 1
- Meeting 2

Also, ensure it is outputted in rich text, not markdown/plaintext/code

## Example

- Input: "What are my daily plans?"
- Output: "Morning! :face_with_cowboy_hat:
  Plans:
- Price Attack Purchase Orders
- Olga Berg Staging Environment Setup
- RB Sellars/DAR Gift Voucher Discount Split Issue
  Meetings:
- TroubleShoot Gft Card Issue - Waurn Ponds
- WIP - RB Sellars
- Squad Connect Daily Stand-up"
