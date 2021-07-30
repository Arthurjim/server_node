const jwt = require('jsonwebtoken')
require('dotenv').config({path:'variables.env'})

module.exports = function(req,res,next){
    //leer el token de header
    const token = req.header('x-auth-token')
    //revisar si no hay token
    if(!token){
        return res.status(401).json({msg:'Permiso no valido'})
    }
    //validar el token
    try {   
        const cifrado = jwt.verify(token, process.env.SECRET)
        //le agrega al request el token cifrado 
        req.user=cifrado.user;
        next()
    } catch (error) {
        res.status(401).json({msg:'Token no valido'})
    }
}