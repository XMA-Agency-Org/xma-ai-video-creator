#!/bin/bash
set -euo pipefail

PROJECT_DIR="/home/faezix/Work/projects/XMA Projects/internal/xma-ai-video-creator"
WATCH_DIR="$PROJECT_DIR/public/videos/xma"
BUN="/home/faezix/.bun/bin/bun"
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u)/bus"

notify() {
  notify-send --icon=video-x-generic "$1" "$2" 2>/dev/null || true
}

cd "$PROJECT_DIR"

echo "[xma-video-sync] Watching $WATCH_DIR"

inotifywait -m -e close_write,moved_to --format '%f' "$WATCH_DIR" | while read -r filename; do
  ext="${filename##*.}"
  if [[ "${ext,,}" == "mp4" || "${ext,,}" == "mov" ]]; then
    echo "[xma-video-sync] New video: $filename — running sync"
    notify "XMA Video Sync" "Syncing $filename…"
    if "$BUN" run sync-videos; then
      notify "XMA Video Sync" "✓ $filename synced to Cloudinary + Sanity"
    else
      notify "XMA Video Sync — Error" "✗ Sync failed for $filename. Check the log."
    fi
  fi
done
