# Chat Application with Socket.IO

## Overview

This project demonstrates the creation of a simple real-time chat application using React on the client side and Node.js with Express and Socket.IO on the server side. The application allows users to join a chat room by providing their name and room name. The interaction between the client and server is handled using WebSockets, which facilitates real-time, bi-directional communication.

## Features

- **Real-time communication**: Users can join a chat room and communicate with other users in real-time.
- **Socket.IO integration**: The app uses Socket.IO for WebSocket communication, allowing low-latency interactions between the client and server.
- **Dynamic room assignment**: Users can join specific chat rooms based on the room name provided in the query parameters.

## Interaction Flow

### 1. **Client-Side Interaction**

- **Component Initialization**:

  - When the user navigates to the chat page, the `Chat` component is initialized.
  - The component uses the `useEffect` hook to handle the setup of the WebSocket connection.

- **Parsing Query Parameters**:

  - The query parameters (e.g., `?name=John&room=Room1`) are parsed from the URL using `queryString.parse()`.
  - The parsed `name` and `room` values are stored in the component's state.

- **Connecting to the Server**:

  - A WebSocket connection is established to the server running at `localhost:5000`.
  - The client emits a `"join"` event to the server, sending the `name` and `room` data.

- **Cleanup on Unmount**:
  - If the user navigates away from the chat page, the component unmounts.
  - A cleanup function is triggered, which emits a `"disconnect"` event to the server and removes all event listeners associated with the socket.

### 2. **Server-Side Interaction**

- **Server Setup**:

  - The server is set up using Express and Socket.IO, with CORS enabled to allow requests from the client running at `localhost:3000`.
  - The server listens on a specified port (default: 5000).

- **Handling Connections**:
  - When a client connects, the server logs a message indicating a new connection.
  - The server listens for the `"join"` event from the client. Upon receiving this event, the server logs the `name` and `room` sent by the client.
  - The server also listens for the `"disconnect"` event, which is triggered when a user leaves the chat, logging a message indicating that the user has disconnected.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Basic knowledge of React, Node.js, and WebSockets.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/chat-app.git

   ```

2. **Install dependecies for both client and server**

   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```
