const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

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
app.use(router);

// Start the server and listen on the specified port
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// Listen for new connections to the WebSocket server
io.on("connection", (socket) => {
  console.log("We have a new connection!!!");

  // Listen for the "join" event from the client
  socket.on("join", ({ name, room }, callback) => {
    // Log the name and room sent by the client
    //console.log("Join event received with name:", name, "and room:", room);

    const { error, user } = addUser({ id: socket.id, username: name, room });
    // console.log("AddUser result: ", { error, user });

    if (error) return callback(error);
    socket.emit("message", {
      user: "admin",
      text: `${user.username}, Welcome to the Room ${user.room}`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.username}, has joined!`,
    });
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);
    console.log("Message received: ", message);
    io.to(user.room).emit("message", { user: user.username, text: message });
    callback();
  });

  // Listen for the "disconnect" event, which indicates that the user has left
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.username} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
