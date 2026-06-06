#!/bin/bash

# Script to optimize large webp images
# Images > 8MB will be compressed to quality 75
# Images 4-8MB will be compressed to quality 80

IMAGE_DIR="public/images"
BACKUP_DIR="public/images-backup-$(date +%Y%m%d-%H%M%S)"

echo "🔍 Finding large webp files..."
echo ""

# Create backup directory
mkdir -p "$BACKUP_DIR"
echo "📦 Backup directory created: $BACKUP_DIR"
echo ""

# Find and optimize files > 8MB (quality 75)
echo "🔴 Optimizing files > 8MB (quality 75)..."
find "$IMAGE_DIR" -name "*.webp" -size +8M | while read file; do
    filename=$(basename "$file")
    size=$(du -h "$file" | cut -f1)
    echo "  Processing: $filename ($size)"

    # Backup original
    cp "$file" "$BACKUP_DIR/"

    # Create temp file
    temp_file="${file}.temp.webp"

    # Optimize
    cwebp -q 75 "$file" -o "$temp_file" 2>/dev/null

    # Replace if successful
    if [ $? -eq 0 ]; then
        mv "$temp_file" "$file"
        new_size=$(du -h "$file" | cut -f1)
        echo "  ✅ Compressed: $size → $new_size"
    else
        echo "  ❌ Failed to compress"
        rm -f "$temp_file"
    fi
done

echo ""

# Find and optimize files 4-8MB (quality 80)
echo "🟡 Optimizing files 4-8MB (quality 80)..."
find "$IMAGE_DIR" -name "*.webp" -size +4M -size -8M | while read file; do
    filename=$(basename "$file")
    size=$(du -h "$file" | cut -f1)
    echo "  Processing: $filename ($size)"

    # Backup original
    cp "$file" "$BACKUP_DIR/"

    # Create temp file
    temp_file="${file}.temp.webp"

    # Optimize
    cwebp -q 80 "$file" -o "$temp_file" 2>/dev/null

    # Replace if successful
    if [ $? -eq 0 ]; then
        mv "$temp_file" "$file"
        new_size=$(du -h "$file" | cut -f1)
        echo "  ✅ Compressed: $size → $new_size"
    else
        echo "  ❌ Failed to compress"
        rm -f "$temp_file"
    fi
done

echo ""
echo "✨ Optimization complete!"
echo "📦 Original files backed up to: $BACKUP_DIR"
echo ""
echo "To restore originals if needed:"
echo "  cp $BACKUP_DIR/* $IMAGE_DIR/ -r"
