//auth routes

const express = require('express')
const router = express.Router()
const { check} = require('express-validator');
const authController = require('../controllers/authControlller');
const auth = require('../middleware/auth');
//Inciiar sesión
//endpoint api/auth
router.post('/',
  authController.userAunth
);

router.get('/',auth,authController.usuarioAutenticado)



module.exports = router;