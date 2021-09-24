var UserServices = require('./../services/UserServices');
class UsersController{
    static async newUser(req,res){
        var userData=req.body
        var response = await UserServices.Register(userData)
        res.send(response);
    }
    static async loginUser(req, res){
        var loginData=req.body
        var response = await UserServices.createTokenOnLogin(loginData)
        res.send(response)
    }
}
module.exports=UsersController;