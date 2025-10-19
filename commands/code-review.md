---
description: Review staged code changes for quality, bugs, and best practices
---

Review the currently staged git changes and provide a comprehensive code review.

Follow these steps:

1. Run `git diff --staged` to see all staged changes
2. Analyze the changes for:
   - Potential bugs or logical errors
   - Code quality and maintainability issues
   - Performance concerns
   - Security vulnerabilities
   - Best practices and conventions
   - Test coverage considerations
3. Provide a structured review with:
   - Summary of changes
   - Issues found (categorized by severity: critical, major, minor)
   - Positive aspects of the code
   - Specific recommendations for improvements
4. If no changes are staged, inform the user and suggest staging files first

Be constructive and thorough in your review.

- When developing with React, ensure the following is maintained:
  - Do not use named React exports, i.e. no ` import {useEffect} from "react"`, always use `import React from "react"` and then `React.useEffect`
  - Ensure React hooks are ordered correctly:
  - useRef
  - useState
  - useMemo
  - useCallback
  - useEffect
  - Ensure variable names are consistent and accurate
    - i.e. a function that adds an item to cart should be called `handleAddToCart`
      - Not `addtocart` or `addCart` etc
- Ensure your data is correctly typed using correct syntax, i.e. `type` `enum` `interface`
