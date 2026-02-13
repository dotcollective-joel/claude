---
name: "scope-task"
description: "Scope a task from a basic prompt and output in the required format"
---

# Task Scope Generator

Follow these steps in order:

1. **Get task**: If there is a task link, call the get-task tool with the task URL to grab task details
2. If there is a task description, take that into consideration too
3. Review the entire details and parse them into a comment following the below structure:

## Key Principles

**Scope items should be:**
- High-level tasks (what needs to be done, not how to do it)
- Simple bullet points with no nested sub-items
- Action-oriented and concise (5-10 words max per item)
- Free of technical implementation details (no CLI commands, API names, or code specifics)
- Limited to 3-6 items total

**Example of too detailed:** "Scaffold POS UI Extension using shopify app generate extension --template=pos_action"
**Better:** "Scaffold POS UI Extension"

**Example of too detailed:** "UI Components: Text field for custom product ID input, Validation for product ID format, Save/Cancel buttons"
**Better:** "Add text input for custom product ID"

**Acceptance Criteria and Testing Notes** can be more specific but should still avoid implementation details. Focus on observable behavior and outcomes.

## Format

---

Output a summary of work

Scope

- SCOPE 1
- SCOPE 2
- SCOPE 3

Out of Scope

- ITEM 1
- ITEM 2

Acceptance Criteria

- ITEM 1
- ITEM 2

Testing Notes

- ITEM 1
- ITEM 2

---

## Here is a template/example:

Customers should be able to easily return to the originating collection after viewing a product. This improves browsing flow and supports conversion by reducing drop-offs.

Scope

- Add link when product is accessed from a collection context
- Respect collection sorting and filters in URL
- Use semantic markup for accessibility

Out of Scope

- No visual enhancements beyond simple text link (within existing style guide)
- Does not persist context across sessions

Acceptance Criteria

- When a customer lands on a PDP from a collection, a “Back to Collection” link is displayed
- The link includes correct sorting and filtering parameters
- When accessed directly (e.g. via search or homepage), the link does not display
- Link uses semantic HTML and is keyboard accessible

Testing Notes

- Confirm correct collection is linked
- Confirm no link is shown when visiting PDP directly
- Check keyboard navigation and screen reader output

---
