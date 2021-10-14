const client = require('./../config/dbConnect')
var logger = require('./../services/LoggingService')
var bcrypt = require('bcryptjs');
class ChatsModel {
    static async addNewChatRoom(chatData) {
        try {
            var result = await client.get().collection('ChatRooms').insertOne(chatData)
            return (result.insertedId.toString());

        } catch (e) {
            logger.error(e.message)
        }
    }
    static async addNewParticipant(chatId,data){
        try{
            var result = await client.get().collection('ChatRooms').findOneAndUpdate(chatId,data)
            return 'leave'
        }catch(e){
            logger.error(e.message)
        }
    }
    static async removeParticipant(chatId,data){
        try{
            var result = await client.get().collection('ChatRooms').updateOne(chatId,data)
            return 'join'
        }catch(e){
            logger.error(e.message)
        }
    }
    static async findParticipant(userId,chatId){
        
        try{
            var chat = await client.get().collection('ChatRooms').findOne(chatId)
            var check = chat.participants.find(item=>item.userid==userId)
            if(check===undefined){
                return 'join';
            }else{
                return 'leave';
            }
            
        }catch(e){
            logger.error(e.message)
        }
    }
    static async findChatAndInsertMsg(chatId,newMessage){
        try{
            var result = await client.get().collection('ChatRooms').findOneAndUpdate(chatId,newMessage)
        }catch(e){
            logger.error(e.message)
        }
    }
    static async getMessages(chatId){
        try{
            var result = await client.get().collection('ChatRooms').find(chatId).toArray()
            return result[0].messages
        }catch(e){
            logger.error(e.message)
        }
    }
    static async getChats(){
        try{
            var result = await client.get().collection('ChatRooms').find({},{ projection: { 'messages': 0 , 'createdby': 0} }).toArray()
            return result;
        }catch(e){
            logger.error(e.messages)
        }
    }
}
module.exports = ChatsModel