const express = require("express");
const userAuthenticated = require("../middlewares/UserAuthenticated");
const pipeline = require("../controllers/pipeline");
const notes = require("../controllers/notes");
const tasks = require("../controllers/tasks");

const router = express.Router();

//opportunity
router.get("/pipelines", [userAuthenticated], pipeline.getOpportunities);
router.post("/sa/addOpportunity",[userAuthenticated], pipeline.addOpportunities);
router.post("/sa/deleteOpportunity" ,[userAuthenticated],pipeline.deleteOpportunities);

//notes
router.get("/sa/notes",[userAuthenticated], notes.getNotes );
router.post("/sa/addNotes" ,[userAuthenticated],notes.addNotes );
router.post("/sa/deleteNotes" ,[userAuthenticated],notes.deleteNotes);

//tasks
router.get("/sa/tasks",[userAuthenticated], tasks.getTasks );
router.post("/sa/addTasks" ,[userAuthenticated],tasks.addTasks );
router.post("/sa/deleteTasks" ,[userAuthenticated],tasks.deleteTasks);





module.exports = router;