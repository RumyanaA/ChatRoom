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
            chatData.participants = userid.id;
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
        var messageToPush={
            user:messageData.user,
            message:messageData.message,
            timeStamp:messageData.timeStamp
        }
        //$addToSet adds a value to an array unless the value is already present
        var newMessages={$addToSet:{
            'messages': messageToPush,
                     
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
    static async getUserId(auth,chat){
        try{
            var chatId={
                _id:ObjectId(chat)
            }
        var payload = jwt.verify(auth.slice(7), config.JWT_SECRET);
        var result= await ChatsModel.findParticipant(payload.id,chatId);
        return result;
        }catch(e){
            logger.error(e.message)
        }
    }
    static async joinChatRoom(data){
        var token=data.userId;
        try{
            var userid = jwt.verify(token, config.JWT_SECRET)
            
            var chatId={
                _id: ObjectId(data.chatId)
            }
            
            var dataToUpdate={$addToSet:{
                'participants': {userid: userid.id, lastActive: data.lastActive}
            }
        }
            var result = await ChatsModel.addNewParticipant(chatId,dataToUpdate)
            return result;
        }catch(e){
            logger.error(e.message)
        }
    }
    static async leaveChatRoom(data){
        var token = data.userId
        try{
            var userid = jwt.verify(token, config.JWT_SECRET)
            
            var chatId={
                _id: ObjectId(data.chatId)
            }
            //$pull removes from an existing array all instances of a value or values that match a specified condition.
            var dataToUpdate={$pull:{
                'participants': {userid: userid.id}
            }
        }
        var result = await ChatsModel.removeParticipant(chatId,dataToUpdate)
        return result;
        }catch(e){
            logger.error(e.message)
        }
    }
    
}
module.exports = ChatServices