#!/usr/bin/env bash
# Downloads the source GLBs from Sketchfab into assets-src/models (git-ignored), then run
#   node scripts/optimize-models.mjs
# Needs SKETCHFAB_API_TOKEN (Sketchfab → Settings → Password & API) in .env.local.
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . ./.env.local; set +a
mkdir -p assets-src/models
for pair in \
  excavator:3dde2c846cc54a4d9fabcc821c9b9caa \
  tipper:bdd68dcc73be430dbffff61017c95fb8 \
  hyva:1d46922d2a0b4aa688349dd005fe5ee1 \
  prime-mover:a5c03c1a1c2c4b21b7db6192b1ef8718; do
  name=${pair%%:*}; uid=${pair##*:}
  url=$(curl -fsS -H "Authorization: Token $SKETCHFAB_API_TOKEN" "https://api.sketchfab.com/v3/models/$uid/download" \
    | python3 -c "import json,sys; print(json.load(sys.stdin)['glb']['url'])")
  curl -fsS -o "assets-src/models/$name.glb" "$url"
  echo "downloaded $name"
done
