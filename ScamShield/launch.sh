#!/bin/bash
echo "Starting ScamShield on Linux..."
echo "Opening browser..."
xdg-open http://localhost:3000 > /dev/null 2>&1 &
node server.js
