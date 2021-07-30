//users routes

const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { check} = require('express-validator');

//create user
//endpoint auth/users
router.post('/',
    [
        check('email', 'invalid Email  ').isEmail(),
        check('password', 'password minimo 6 caracteres  ').isLength({min:6}),      

    ],
    userController.createUser);



module.exports = router;