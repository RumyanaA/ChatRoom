var client = require('./config/dbConnect')
const express = require("express");
var cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");
var routes = require('./routes/routes.js')
var ChatController = require('./controller/chatController')
const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);

var chatRooms = [];
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
// app.use(express.urlencoded({extended:false}));

app.use('/', routes)

io.on("connection", (socket) => {
  socket.on('createRoom', roomId => {
    socket.join(roomId);
    console.log(roomId)
  })
  socket.on('leftRoom', data=>{
    console.log(`${data.user} has left chat ${data.chatID}`) //for back end
    socket.leave(data.chatID)
  })
  socket.on('newUserConnected', data => {
    socket.username=data.username
    var messageObj={
      user:'',
      message:`${data.username} has entered the chat`,
      timeStamp: new Date()
    }
    io.to(data.chatID).emit('newUserJoined', messageObj)
  })

  socket.on('newMessage', messageData => {
    var emittedMessageData = JSON.parse(messageData)
    ChatController.newMessage(emittedMessageData)
    io.to(emittedMessageData.chatID).emit('updateChat', emittedMessageData)
    // io.emit('updateChat', emittedMessageData)
  })
  socket.on('newChatRoom', data => {
    io.emit('addNewChatRoom', data)
  })
  socket.on('disconnecting', () => {
    var connectionMessage = socket.username + " Disconnected from Socket " + socket.id;
    console.log(connectionMessage);
  })


});


httpServer.listen(8080, () => {
  client.dbConnect();
  console.log(`Listening to 8080`);
})
