var jwt = require('jsonwebtoken');
var config = require('./../config/config');
var logger = require('./LoggingService.js');
var ObjectId = require('mongodb').ObjectId;
var ChatsModel = require('./../model/ChatsModel')
class ChatServices {
    static async createChat(chatData) {
        var token = chatData.createdby;
        try {
            var userid = jwt.verify(token, config.JWT_SECRET)
            chatData.createdby = userid.id;
            var result = await ChatsModel.addNewChatRoom(chatData)

            return result

        } catch (e) {
            logger.error(e.message)
        }
    }
    static async saveNewMessage(messageData){
        var chatId={
            _id: ObjectId(messageData.chatID)
        }
        var newMessages={$addToSet:{
            'messages': messageData.message,
                     
        }
        }
        var result = await ChatsModel.findChatAndInsertMsg(chatId,newMessages)
    }
    static async getAllMessages(data){
        var chatId={
            _id:ObjectId(data)
        }
        var result = await ChatsModel.getMessages(chatId)
        return result
    }
    static async getAllChatRooms(){
        var result = await ChatsModel.getChats()
        return result
    }
}
module.exports = ChatServices