import React from "react";
import "./Message.css";

const Message = ({ message = {}, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const isSentByCurrentUser = message.user.trim().toLowerCase() === trimmedName;

  return (
    <div
      className={`messageContainer ${
        isSentByCurrentUser ? "justifyEnd" : "justifyStart"
      }`}
    >
      {isSentByCurrentUser ? (
        <>
          <p className="sentText pr-10">{name}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{message.text}</p>
          </div>
        </>
      ) : (
        <>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{message.text}</p>
          </div>
          <p className="sentText pl-10 ">{message.user}</p>
        </>
      )}
    </div>
  );
};

export default Message;
