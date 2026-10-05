const express = require('express');
const http = require('http');
const WebSocket = require('ws'); // Capital 'W'

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected successfully');
  ws.on('message', (message) => {
    ws.send(`Echo: ${message}`);
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
