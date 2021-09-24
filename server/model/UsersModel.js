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
static async checkUserData(userData) {
    try {
        var query = {
            username: userData.username
        }
        var result = await client.get().collection("Users").find(query).toArray()
        if (result.length == 1) {
            const verified = bcrypt.compareSync(userData.password, result[0].password);
            if (verified == true) {
                return (result[0]._id);
            } else {
                return '-1';
            }
        } else {
            return '-1';
        }
    }
    catch (e) {
        logger.error(e.message);
    }
}
}
module.exports=UsersModel