#!/bin/bash
# Clean build script for Vercel
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json
npm install
npm run build
