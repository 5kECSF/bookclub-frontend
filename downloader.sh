#!/bin/bash

# Define directories
SRC_DIR="./src"
ASSETS_DIR="public/assets/anima"

# Ensure the assets directory exists
mkdir -p "$ASSETS_DIR"

# Find all relevant files in /src (excluding node_modules and public/assets)
FILES=$(find "$SRC_DIR" -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.jsx" \) ! -path "*/node_modules/*" ! -path "*/public/assets/*")

# URL pattern to match AnimaApp resources
URL_PATTERN="http://c\.animaapp\.com/[^\s\"')]+"

echo "Scanning for AnimaApp URLs in $SRC_DIR..."

# Iterate over each file
for file in $FILES; do
    # Find URLs in the file
    urls=$(grep -Eo "$URL_PATTERN" "$file" | sort -u)
    
    if [[ -n "$urls" ]]; then
        echo "Processing: $file"

        for url in $urls; do
            # Extract filename from URL
            filename=$(basename "$url")
            local_path="$ASSETS_DIR/$filename"
            nestjs_path="/assets/$filename"

            # Download the file if it doesn't already exist
            if [[ ! -f "$local_path" ]]; then
                echo "Downloading: $url -> $local_path"
                curl -s "$url" -o "$local_path"
            fi

            # Replace occurrences in the file
            sed -i "s|$url|$nestjs_path|g" "$file"
        done
    fi
done

echo "✅ Done! All resources are downloaded to $ASSETS_DIR and URLs updated in $SRC_DIR."
