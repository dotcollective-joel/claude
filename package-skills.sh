#!/bin/bash

# Script to package each skill folder into a ZIP file
# Usage: npm run package-skills

set -e

SKILLS_DIR="skills"
OUTPUT_DIR="dist/skills"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Clean previous builds
rm -rf "$OUTPUT_DIR"/*.zip

echo "Packaging skills..."

# Loop through each directory in the skills folder
for skill_path in "$SKILLS_DIR"/*; do
  # Skip if not a directory
  if [ ! -d "$skill_path" ]; then
    continue
  fi

  # Get the skill name (directory name)
  skill_name=$(basename "$skill_path")

  # Check if Skill.md exists
  if [ ! -f "$skill_path/Skill.md" ]; then
    echo "⚠️  Skipping $skill_name - no Skill.md found"
    continue
  fi

  # Create temporary directory for packaging
  temp_dir=$(mktemp -d)
  package_dir="$temp_dir/$skill_name"
  mkdir -p "$package_dir"

  # Copy Skill.md
  cp "$skill_path/Skill.md" "$package_dir/"

  # Copy resources directory if it exists
  if [ -d "$skill_path/resources" ]; then
    cp -r "$skill_path/resources" "$package_dir/"
    echo "✓ Packaging $skill_name (with resources)"
  else
    echo "✓ Packaging $skill_name"
  fi

  # Create ZIP file
  cd "$temp_dir"
  zip -r "$skill_name.zip" "$skill_name" > /dev/null
  cd - > /dev/null

  # Move ZIP to output directory
  mv "$temp_dir/$skill_name.zip" "$OUTPUT_DIR/"

  # Clean up temp directory
  rm -rf "$temp_dir"
done

echo ""
echo "✅ All skills packaged to $OUTPUT_DIR/"
ls -lh "$OUTPUT_DIR"/*.zip 2>/dev/null || echo "No skills were packaged"
