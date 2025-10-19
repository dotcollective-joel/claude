---
description: Create a new git branch from a specified source branch
params:
  - name: source_branch
    description: The branch to create from (e.g., main, develop)
  - name: branch_name
    description: The name for the new branch
---

Create a new git branch named "{{branch_name}}" from the "{{source_branch}}" branch.

Follow these steps:
1. First, fetch the latest changes from the remote repository
2. Ensure the source branch exists locally or remotely
3. Create and checkout the new branch from the source branch
4. Confirm the branch was created successfully by showing the current branch

Use git commands to accomplish this task.
