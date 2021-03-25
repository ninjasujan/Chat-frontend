let socket = null;

export const connectToRandomChat = (token) => {
  socket = io("http://104.161.92.74:5437/", {
    transports: ["websocket", "polling", "flashsocket"],
    query: {
      token: token,
    },
  });
};

export const JoinChatevent = (token) => {
  socket.emit("join_anonymous_chat", {
    query: {
      token: token,
    },
  });
};

if (socket) {
  socket.on("anonymous_chat_joined", (data) => {
    console.log(data);
  });

  socket.on("anonymous_chat_waiting", (data) => {
    console.log(data);
  });
}
