#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

PROJECT_DIR="/root/animechan"

cd "$PROJECT_DIR" || exit 1
git stash save "stashing for clean deploy"
git switch main

if pnpm build; then
    pm2 reload ecosystem.config.js
else
    echo "Build failed. Deployment aborted."
    exit 1
fi
