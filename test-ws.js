const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', function open() {
  console.log('Connected to server via WebSocket');
  ws.send('Hello Server!');
});

ws.on('message', function incoming(data) {
  console.log('Received from server:', data.toString());
});
