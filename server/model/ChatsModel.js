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
    static async findChatAndInsertMsg(chatId,newMessages){
        try{
            var result = await client.get().collection('ChatRooms').findOneAndUpdate(chatId,newMessages)
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