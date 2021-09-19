var UserServices = require('./../services/UserServices');
class UsersController{
    static async newUser(req,res){
        var userData=req.body
        var response = await UserServices.Register(userData)
        res.send(response);
    }
}
module.exports=UsersController;