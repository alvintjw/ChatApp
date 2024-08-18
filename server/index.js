const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// Import the router for handling other HTTP routes (not shown in the example)
const router = require("./router");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS settings to allow connections from the client
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from the client running on localhost:3000
    methods: ["GET", "POST"], // Allowable HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  },
});

// Enable CORS for all HTTP routes handled by Express
app.use(cors());

// Start the server and listen on the specified port
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// Listen for new connections to the WebSocket server
io.on("connection", (socket) => {
  console.log("We have a new connection!!!");

  // Listen for the "join" event from the client
  socket.on("join", ({ name, room }, callback) => {
    // Log the name and room sent by the client
    console.log(name, room);
  });

  // Listen for the "disconnect" event, which indicates that the user has left
  socket.on("disconnect", () => {
    console.log("User had left!!!");
  });
});
