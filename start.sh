#!/bin/bash
# Startup script for Ionic 3 app

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node 10
nvm use 10

# Unset NODE_OPTIONS which causes issues with Node 10
unset NODE_OPTIONS

# Start the server
npm run ionic:serve
