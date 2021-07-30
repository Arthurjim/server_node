const Task = require("../models/Task");
const Project = require("../models/Projects");
const { validationResult } = require("express-validator");

//Crea una nueva tarea

exports.createTask = async (req, res) => {
    const {name,idProject} = req.body;
    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //valida si existe el proyecto
   let project = await Project.findById(idProject)
    if(!project){
        return res.status(404).send({msg:'Proyecto no encontrado'})
    }

    //valida si existe el usuario y tiene el token
    if(project.user.toString() !== req.user.id){
        return res.status(500).send({msg:'Usuario no autorizado vuelve a iniciar sesión'})
    }
    try {
        //se agrean los nuevos campos
        let task = await new Task({
            name:name,
            project:project._id
        })
        task.save()

    return res.status(200).send(task)
    } catch (error) {
        console.error(error)
    }
};


//Get task


exports.getTasks =async(req,res)=>{
        let userId = req.user.id
        //lo cambiamos a req.query, por que lo estamos mandando como ruta,{params:{id}} en el cliente
        let {idProject} = req.query

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

    try {
        let project = await Project.findById(idProject)
        if(!project){
            return res.status(404).send({msg:'Proyecto no encontrado'})
        }
        if(project.user.toString() !== userId){
            return res.status(500).send({msg:'Usuario no autorizado vuelve a iniciar sesión'})
        }
        let tasks = await Task.find({project:idProject})
        return res.status(200).send({tasks})
    } catch (error) {
        console.error(error)
        return res.status(404).send('ERROR EN EL SERVIDOR en gettasks')
    }
}


//delete task


exports.deleteTask =async(req,res)=>{
    const {idProject} = req.query;
    const id = req.params.id
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = await Project.findById(idProject)
    if(!project){
        return res.status(404).send({msg: 'Proyecto no encontrado'})
    }
    if(project.user.toString() !== req.user.id){
        return res.status(500).send({msg:'Usuario no autorizado vuelve a iniciar sesión'})
    }
    try {
        let tasktDelete = await Task.findByIdAndRemove(id)
        res.status(202).send({tasktDelete})
    } catch (error) {
        console.error(error)
        return res.status(404).send('ERROR EN EL SERVIDOR en deleteTask')
    }
}



//update project


exports.updateTask =async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let task =req.body;
    let {name,state, project} = task
    if(state === undefined){
        state = false
    }

    let newTask ={}
    newTask.name= name
     newTask.state=state
    if(!project){
        return res.status(400).send({msg:'Project not exist'})
    }
    //revisa que el proyecto existe
    const projecto = await Project.findById(project)
    if(!projecto){
        return res.stauts(400).send({msg:'Project dont found'})
    }

    //revisa si el usuario esta autorizado
    if(projecto.user.toString() !== req.user.id){
        return res.status(400).send({msg:'usuario no autorizado'})
    }
    const taskExist = await Task.findById(req.params.id)

    if(!taskExist){
        return res.status(400).send({msg:"Task not found"})
    }
    try {

        let task = await Task.findByIdAndUpdate({_id:req.params.id},{$set:newTask},{new:true})
        res.status(200).send({task})
        
    } catch (error) {
        console.error(error)
        res.status(500).send({msg:'Server error'})
    }
}