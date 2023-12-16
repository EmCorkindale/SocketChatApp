const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
const content = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });

  // socket.on("send-nickname", (nickname, msg) => {
  //   socket.nickname = nickname;
  //   socket.msg = msg;
    
  //   // Push an object with nickname and msg properties into the content array
  //   content.push({ nickname: socket.nickname, msg: msg });

  //   console.log(content);
  // });
});

server.listen(8000, () => {
  console.log("listening on *:8000");
});
