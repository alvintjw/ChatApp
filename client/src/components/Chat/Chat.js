import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = () => {
  // State to hold the user's name and the room they are joining
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  // The endpoint where the Socket.IO server is running
  const ENDPOINT = "localhost:5000";

  // useLocation is used to access the query parameters from the URL
  const location = useLocation();

  useEffect(() => {
    // Parse the query parameters from the URL to extract the name and room
    const { name, room } = queryString.parse(location.search);

    // Initialize the socket connection to the server at the specified endpoint
    socket = io(ENDPOINT);

    // Set the name and room in the state
    setName(name);
    setRoom(room);

    // Emit a "join" event to the server, sending the name and room data
    socket.emit("join", { name, room }, () => {});

    // Cleanup function to run when the component unmounts
    return () => {
      // Emit a "disconnect" event to the server when the user leaves
      socket.emit("disconnect");

      // Remove all event listeners associated with this socket instance
      socket.off();
    };
  }, [ENDPOINT, location.search]); // The effect re-runs if ENDPOINT or location.search changes

  // Render the chat UI (placeholder for now)
  return <h1>Chat</h1>;
};

export default Chat;
