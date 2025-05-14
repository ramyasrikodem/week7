const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;

// Serve static files
app.use(express.static('public'));

// Store connected sockets
let sockets = [];

io.on('connection', (socket) => {
  console.log('A user connected');
  sockets.push(socket);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    sockets = sockets.filter(s => s !== socket);
  });
});

// One global interval (only once, not per client)
setInterval(() => {
  const randomNum = Math.floor(Math.random() * 100);
  sockets.forEach(socket => {
    socket.emit('number', randomNum);
  });
}, 1000);

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
