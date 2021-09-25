var ChatServices = require('./../services/ChatService')
class ChatController{
    static async createNewChat(req,res){
        var chatData=req.body
        var response = await ChatServices.createChat(chatData)
        res.send(response);
    }
    static async newMessage(messageData){
        var response = await ChatServices.saveNewMessage(messageData)
        // res.send(response);
    }
    static async getChatHistory(req, res){
        var chatId=req.query.id
        var result = await ChatServices.getAllMessages(chatId)
        res.send(result);
    }
    static async getAllChats(req, res){
        var result = await ChatServices.getAllChatRooms()
        res.send(result)
    }
}
module.exports=ChatController