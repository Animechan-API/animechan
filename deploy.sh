#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

git stash save "stashing for clean deploy"
git switch main
git pull origin main

pnpm install --frozen-lockfile

if pnpm build; then
    pm2 reload ecosystem.config.js
else
    echo "Build failed. Deployment aborted."
    exit 1
fi
