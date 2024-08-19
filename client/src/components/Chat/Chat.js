import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";

// import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import InfoBar from "../InfoBar/InfoBar";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = () => {
  // State to hold the user's name and the room they are joining
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    // Cleanup function to run when the component unmounts
    return () => {
      // Emit a "disconnect" event to the server when the user leaves
      socket.emit("disconnect ");

      // Remove all event listeners associated with this socket instance
      socket.off();
    };
  }, [ENDPOINT, location.search]); // The effect re-runs if ENDPOINT or location.search changes

  useEffect(() => {
    // Listen for the "message" event from the server
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    // Listen for the "roomData" event from the server to get all the uesrs in the room
    socket.on("roomData", ({ users }) => {
      console.log("Users in roomData: ", users);
      setUsers(users);
    });
  }, [messages]);

  //Function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  //console.log(message, messages);
  //console.log("Users are:", users);

  return (
    <>
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <TextContainer users={users} />
      </div>
    </>
  );
};

export default Chat;
