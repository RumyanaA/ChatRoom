var jwt = require('jsonwebtoken')
var config = require('./../config/config')
var UsersModel = require('./../model/UsersModel')
class UserServices{
static async Register(userData){
    var resultId = await UsersModel.addNewUser(userData)
    var token = jwt.sign({ "id": resultId }, config.JWT_SECRET)
    return token

}
static async createTokenOnLogin(loginData){
    var userId = await UsersModel.checkUserData(loginData)
    if(userId!='-1'){
        var token = jwt.sign({ "id": userId }, config.JWT_SECRET)
        return token;
    }else{
        return '-1'
    }
}
}
module.exports=UserServices