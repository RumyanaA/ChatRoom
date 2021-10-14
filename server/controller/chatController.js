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
    static async handleParticipants(req,res){
        var auth=req.headers.authorization;
        var chatId=req.query.chatId
        var result = await ChatServices.getUserId(auth,chatId)
        res.send(result)
    }
    static async handleLeaveChat(req,res){
        var data=req.body
        var result = await ChatServices.leaveChatRoom(data)
        res.send(result)
    }
    static async getAllChats(req, res){
        var result = await ChatServices.getAllChatRooms()
        res.send(result)
    }
    static async handleJoinChat(req, res){
        var joinChatData=req.body
        var result = await ChatServices.joinChatRoom(joinChatData)
        res.send(result)
    }
}
module.exports=ChatController