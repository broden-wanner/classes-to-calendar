set -e

# Remove zip folder if it already exists
if [[ -f "./extension/zip/classes-to-calendar-extension_$1.zip" ]]; then
    rm "./extension/zip/classes-to-calendar-extension_$1.zip"
fi

# Create zip folder
cd extension;
zip -r "./zip/classes-to-calendar-extension_$1.zip" \
    content.js \
    background.js \
    manifest.json \
    icons;
cd ..;
    