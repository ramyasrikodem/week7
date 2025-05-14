const socket = io();

// Listen for 'number' event from the server
socket.on('number', (num) => {
  console.log('Random number from server:', num);
  document.getElementById('number').textContent = num;
});