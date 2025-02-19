import express from 'express';
import http from 'http'; // Importing http module for creating the server

// Initialize the express app
const app = express();

// Create the HTTP server using Express
const server = http.createServer(app);

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Make the server listen on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
