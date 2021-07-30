const Project = require('../models/Projects')
const {validationResult} = require('express-validator')

exports.createProject = async(req,res)=>{
    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        //Crear un nuevo proyecto
        const project = new Project(req.body)

        //Guardar al creador JWT, para eso necesitamos el token
        project.user = req.user.id
        //Guardamos el proyecti
        project.save();
        res.status(200).json({project})

    } catch (error) {
        console.error('error')
        res.status(500).json({msg:"token no valido"})
    }
    
}


//obtener los proyectos del usuario

exports.getProjects =async(req,res)=>{
    try {
        const projects = await Project.find({user:req.user.id})
        res.json({projects})
    } catch (error) {
        console.error(error)
    }
}



//actualiza un proyecto

exports.updateProject = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {name} = req.body;
      const newProject = {}
      if(name){
        newProject.name = name
      }
    try {
        // revisar el id
        let project = await Project.findById(req.params.id)
        //si el proyecto existe o no
        if(!project){
            res.status(404).json({msg:'Proyecto no encontrado'})
        }
        //verficiar el creador 
        if(project.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //actualizar
        project = await Project.findByIdAndUpdate({_id:req.params.id},{$set : newProject},{new:true})

        res.json({project})
    } catch (error) {
        console.error(error)
        res.status(500).send('error en el servidor')
    }
}

//eliminando proyecto

exports.deleteProject =async (req,res)=>{

    let id = req.params.id
    try {
        //revisar creador 
        
        const project = await Project.findById(id)
        
        if(!project){
            return res.json({mgs:'Proyecto no encontrado'})
        }
        if(project.user.toString() !== req.user.id){
            return res.status(400).send({msg:'Usuario no valido'})
        }
        let projectDelete = await Project.findOneAndRemove({_id: id})
        res.status(200).send(projectDelete)

    } catch (error) {
        console.error(error)
        res.status(500).send('error en el servidor')

    }

}