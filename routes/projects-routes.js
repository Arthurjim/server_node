const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//create projects
//endpoint api/projects
router.post(
   "/",
   auth,
   [check("name", "El nombre del proyecto es obligatorio").not().isEmpty()],
   projectController.createProject
);

//get projects
router.get("/", auth, projectController.getProjects);
//update project by Id

router.put("/:id", [check("name", "El nombre del proyecto es obligatorio").not().isEmpty()], auth, projectController.updateProject);

router.delete("/:id",auth,projectController.deleteProject)
module.exports = router;
