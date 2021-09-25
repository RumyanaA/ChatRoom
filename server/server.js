var client = require('./config/dbConnect')
const express = require("express");
var cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");
var routes = require('./routes/routes.js')
var ChatController=require('./controller/chatController')
const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);

var chatRooms=[];
const io = new Server(httpServer, {  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  } });
  // app.use(express.urlencoded({extended:false}));
  
  app.use('/',routes)
  
io.on("connection", (socket) => {
  socket.on('newUserConnected', username=>{
    io.emit('newUserJoined',`${username} has entered the chat`)
  })
    
    socket.on('newMessage', messageData=>{
      var emittedMessageData=JSON.parse(messageData)
      ChatController.newMessage(emittedMessageData)
      io.emit('updateChat',emittedMessageData.message)
    })
    socket.on('newChatRoom',data=>{
      io.emit('addNewChatRoom',data)
    })


});


httpServer.listen(8080, () => {
  client.dbConnect(); 
      console.log(`Listening to 8080`);
  })
