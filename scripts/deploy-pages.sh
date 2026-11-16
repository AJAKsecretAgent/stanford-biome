#!/usr/bin/env bash
# Builds a static copy of the site and publishes it to the gh-pages branch.
# Usage: npm run deploy:pages
set -euo pipefail
cd "$(dirname "$0")/.."
root=$(pwd)

remote=$(git remote get-url origin)
repo=$(basename "$remote" .git)
stash=$(mktemp -d)

# API routes need a server, so they are left out of the static build.
mv src/app/api "$stash/api"
trap 'mv "$stash/api" "$root/src/app/api"' EXIT

rm -rf .next out
STATIC_EXPORT=1 BASE_PATH="/$repo" npx next build
touch out/.nojekyll

cd out
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" \
  commit -q -m "Deploy site"
git push -f -q "$remote" gh-pages
rm -rf .git
echo "Published. It can take a minute to go live."
