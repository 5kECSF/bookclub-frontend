#!/bin/bash

# Define the source folder and target directory
SRC_DIR="./src"
TARGET_DIR="./public/assets/anima"
ANIMA_URL="https://c.animaapp.com/"
LOCAL_PATH="/assets/anima"

# Create the target directory if it doesn’t exist
mkdir -p "$TARGET_DIR"

# Check if src directory exists
if [ ! -d "$SRC_DIR" ]; then
  echo "Error: 'src' directory not found in the current folder."
  exit 1
fi

# Temporary file to store URLs
TEMP_FILE=$(mktemp)

# Find all files in src, grep for Anima URLs, and extract unique URLs
echo "Searching for Anima URLs in $SRC_DIR..."
find "$SRC_DIR" -type f -exec grep -o "https://c\.animaapp\.com/[^'\" ]*" {} \; | sort -u > "$TEMP_FILE"

# Check if any URLs were found
if [ ! -s "$TEMP_FILE" ]; then
  echo "No Anima URLs (https://c.animaapp.com/) found in $SRC_DIR."
  rm "$TEMP_FILE"
  exit 0
fi

# Download each URL only if the file doesn’t exist in TARGET_DIR
echo "Checking and downloading resources to $TARGET_DIR..."
while IFS= read -r url; do
  # Extract the filename from the URL (e.g., mask-group.png)
  filename=$(basename "$url")
  target_file="$TARGET_DIR/$filename"

  # Check if the file already exists
  if [ ! -f "$target_file" ]; then
    # Download the file using curl
    echo "Downloading $filename..."
    curl -s -o "$target_file" "$url"
    
    # Check if download succeeded
    if [ $? -eq 0 ]; then
      echo "Successfully downloaded $filename"
    else
      echo "Failed to download $filename"
      rm -f "$target_file"  # Remove incomplete file on failure
    fi
  else
    echo "$filename already exists in $TARGET_DIR, skipping download."
  fi
done < "$TEMP_FILE"
# Replace Anima URLs with local paths in text files under src
echo "Replacing Anima URLs with local paths in $SRC_DIR..."
while IFS= read -r line; do
  url=$(echo "$line" | cut -d' ' -f1)
  local_url=$(echo "$line" | cut -d' ' -f2-)
  # Only process text-like files (e.g., .js, .tsx, .css, .html)
  find "$SRC_DIR" -type f \( -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.jsx" -o -name "*.css" -o -name "*.html" \) \
    -exec sed -i "s|$url|$local_url|g" {} \;
done < "$URL_MAP"

# Clean up temporary files
rm "$TEMP_FILE" "$URL_MAP"

# Clean up temporary file
rm "$TEMP_FILE"

echo "Done! Resources are in $TARGET_DIR, and URLs are updated in $SRC_DIR."