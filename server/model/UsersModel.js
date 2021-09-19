const client = require('./../config/dbConnect')
var logger = require('./../services/LoggingService')
var bcrypt = require('bcryptjs');
class UsersModel{
static async addNewUser(userData){
    try{
        const passwordHash = bcrypt.hashSync(userData.password);
        userData.password= passwordHash
        var query={
            username:userData.username,
            email: userData.email,
            password: userData.password
        }
        var result = await client.get().collection('Users').insertOne(query)
        return (result.insertedId.toString());
    }catch(e){
        logger.error(e.message)
    }
}
}
module.exports=UsersModel