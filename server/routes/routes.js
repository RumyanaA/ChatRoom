const express = require('express');
const router = express.Router();
const UsersController = require('./../controller/usersController')
const ChatController = require('./../controller/chatController')
router.post('/Register', UsersController.newUser)
router.post('/Login', UsersController.loginUser)
router.post('/CreateChatRoom',ChatController.createNewChat)
router.get('/GetChatHistory', ChatController.getChatHistory)
router.get('/getChatRooms', ChatController.getAllChats)
router.post('/UserJoinedChat',ChatController.handleJoinChat)
router.get('/GetUserParticipant',ChatController.handleParticipants)
router.post('/UserLeftChat',ChatController.handleLeaveChat)
module.exports=router