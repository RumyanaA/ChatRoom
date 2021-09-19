var jwt = require('jsonwebtoken')
var config = require('./../config/config')
var UsersModel = require('./../model/UsersModel')
class UserServices{
static async Register(userData){
    var resultId = await UsersModel.addNewUser(userData)
    var token = jwt.sign({ "id": resultId }, config.JWT_SECRET)
    return token

}
}
module.exports=UserServices