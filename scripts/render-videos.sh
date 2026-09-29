#!/usr/bin/env bash
# Renders the site's Remotion compositions to public/video (MP4 + WebM + poster).
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/video
mkdir -p "$OUT"

render() {
  local id=$1 slug=$2 poster_frame=$3
  npx remotion render "$id" "$OUT/$slug.mp4" --codec=h264 --crf=26 --muted --log=error
  npx remotion render "$id" "$OUT/$slug.webm" --codec=vp9 --crf=36 --muted --log=error
  npx remotion still "$id" "$OUT/$slug-poster.jpg" --frame="$poster_frame" --image-format=jpeg --jpeg-quality=80 --log=error
}

render SurveyLoop survey-loop 0
render ProjectRoutes project-routes 359
ls -lh "$OUT"
