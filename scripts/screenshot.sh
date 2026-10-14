#!/usr/bin/env bash
# Full-page screenshot with local headless Chrome (for design review).
# Usage: scripts/screenshot.sh <url> <out.png (Windows path)> [width] [height]
# Load the URL once first when using `next dev`, so the page is compiled.
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --window-size="${3:-1440},${4:-6000}" --virtual-time-budget=8000 \
  --screenshot="$2" "$1" 2>&1 | grep "bytes written"
