#!/bin/bash

pnpm build && pm2 reload ecosystem.config.js
