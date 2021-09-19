const express = require('express');
const router = express.Router();
const UsersController = require('./../controller/usersController')
router.post('/Register', UsersController.newUser)
module.exports=router