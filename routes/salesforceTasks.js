const express = require("express");
var jsforce = require("jsforce");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
router.post("/allTasks",[checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const data = await conn.query("SELECT Id FROM Task");
      res.json({
        statusCode: 200,
        payload: {
          data: data,
        },
      });
    } catch (err) {
      console.log(err)
      res.json({
        statusCode: 500,
        payload: {
          msg: err.message,
        },
      });
    }
  });
  
  router.get("/tasks/:id",[checkAuth],  async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    console.log(req.params.id);
    try {
      const data = await conn.sobject("Task").retrieve(req.params.id);
      res.json({
        statusCode: 200,
        payload: {
          data: data,
        },
      });
    } catch (err) {
      res.json({
        statusCode: 500,
        payload: {
          msg: err.message,
        },
      });
    }
  });
  
  router.post("/getMultipleTasks",[checkAuth], async (req, res) => {
    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const result = await conn.sobject("Task").retrieve(req.body.id);
      res.json({
        statusCode: 200,
        payload: {
          data: result,
        },
      });
    } catch (err) {
        console.log(err)
      res.json({
        statusCode: 500,
        payload: {
          msg: err.message,
        },
      });
    }
  });
  
  router.post("/deleteTasks/:id", [checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });
    try {
      const data = await conn.sobject("Task").destroy(req.params.id);
      res.json({
        statusCode: 200,
        payload: {
          data: data,
        },
      });
    } catch (err) {
      res.json({
        statusCode: 500,
        payload: {
          msg: err.message,
        },
      });
    }
  });
  
  router.post("/deleteMulitpleTasks", [checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const result = await conn.sobject("Task").del(req.body);
      res.json({
        statusCode: 200,
        payload: {
          data: result,
          msg:"success"
        },
      });
    } catch (err) {
      res.json({
        statusCode: 500,
        payload: {
          msg: err.message,
        },
      });
    }
  });
  
  router.post("/addTasks", [checkAuth], async  (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const data = await conn.sobject("Task").create(req.body.data);
      res.json({
        statusCode: 200,
        payload: {
          data: data,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
      res.json({
        statusCode: 500,
        payload: {
          msg: err.message,
        },
      });
    }
  });
  
  router.post("/updateMultipleTasks", [checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });


    try {
      const data = await conn.sobject("Task").update(req.body.editValue);
      res.json({
        statusCode: 200,
        payload: {
          data: data,
        },
      });
    } catch (err) {
      res.json({
        statusCode: 500,
        payload: {
          msg: err.message,
        },
      });
    }
  });

module.exports = router;