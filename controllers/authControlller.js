const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const {validationResult}= require('express-validator')
const jwt = require('jsonwebtoken');

exports.userAunth = async(req,res)=>{
 

    //extraer el email y password

    const {email, password} = req.body;
    try {
        //revisar que sea un usuario registrado
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:'Usuario no existe'})
        }

        //Revisar el paswword
        const passCorrect = await bcryptjs.compare(password,user.password)
        if(!passCorrect){
            return res.status(400).json({msg:'Password not correct'})

        } 
        
        //all correct
         //create JWT
         const payload = {
            user:{
                id: user.id
            }
        }

        //firmar el JWT

        jwt.sign(payload,process.env.SECRET,{
            expiresIn:3600 //1 hour
        },(error,token)=>{
            if(error) throw error;
            //mensaje de confirmacion
            res.json({token})

        })
    } catch (error) {
        console.error(error)
    }

}

//obtiene que usuario esta autenticado

exports.usuarioAutenticado =async(req,res)=>{

    try {
        const user = await User.findById(req.user.id).select('-password')
        res.send({user})

        
    } catch (error) {
        console.error(error)
        res.status(500).json({msg:'Hubo un error'})
    }
}

