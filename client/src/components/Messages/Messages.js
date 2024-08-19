import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";

import "./Messages.css";
const Messages = ({ messages = [], name }) => (
  <ScrollToBottom className="messages">
    {messages.length > 0 ? (
      messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))
    ) : (
      <p>No messages yet.</p>
    )}
  </ScrollToBottom>
);

export default Messages;
