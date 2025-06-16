#!/bin/bash

# SERVER
cd server || exit
echo "Installing server dependencies..."
npm install

if pm2 list | grep -q "asco-server"; then
  echo "Restarting asco-server..."
  pm2 restart asco-server
else
  echo "Starting asco-server..."
  pm2 start npm --name "asco-server" -- start
fi

# CLIENT
cd ../client || exit
echo "Installing client dependencies..."
npm install --legacy-peer-deps
echo "Building client..."
npm run build

if pm2 list | grep -q "asco-client"; then
  echo "Restarting asco-client..."
  pm2 restart asco-client
else
  echo "Starting asco-client..."
  pm2 start npm --name "asco-client" -- run dev
fi
