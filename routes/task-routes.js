const express = require("express");
const router = express.Router();
const auth =  require('../middleware/auth')
const taskController = require('../controllers/taskController')
const {check} = require('express-validator')
// api/task

// Crear task
router.post('/', [check("name", "El nombre de la tarea es obligatorio").not().isEmpty()],auth,taskController.createTask)

// Obtener todas las tareas
router.get('/', [check("idProject", "El id del proyecto es obligatorio").not().isEmpty()],auth,taskController.getTasks)

router.delete('/:id',[check("idProject","El nombre del proyecto es obligatorio").not().isEmpty()],auth,taskController.deleteTask)

//update one task

router.put('/:id',auth,taskController.updateTask)
module.exports = router