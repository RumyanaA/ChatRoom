var client = require('./config/dbConnect')
const express = require("express");
var cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");
var routes = require('./routes/routes.js')
const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);
var chatRoomData=['hi','hi2'];
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
      chatRoomData.push(messageData)
      io.emit('updateChat',messageData)
    })


});


httpServer.listen(8080, () => {
  client.dbConnect(); 
      console.log(`Listening to 8080`);
  })
