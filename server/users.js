const users = [];

// Function to add a user
const addUser = ({ id, username, room }) => {
  //   console.log("Inside AddUser", id, username, room);
  // Validate username
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  // Clean the data
  lusername = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Check for existing user
  const existingUser = users.find(
    (user) => user.room === room && user.username === lusername
  );

  // Check if username is taken
  if (existingUser) {
    return {
      error: "Username is already taken!",
    };
  }

  // Create user object
  const user = { id, username, room };

  // Add user to the users array
  users.push(user);

  return { user };
};

// Function to remove a user
const removeUser = (id) => {
  // Find index of user with given id
  const index = users.findIndex((user) => user.id === id);

  // If user exists, remove it from the array
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Function to get a user
const getUser = (id) => {
  // Find user with given id
  return users.find((user) => user.id === id);
};

// Function to get users in a room
const getUsersInRoom = (room) => {
  // Filter users array to get users in the specified room
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
