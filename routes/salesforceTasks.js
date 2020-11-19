const express = require("express");
var jsforce = require("jsforce");
const router = express.Router();

router.post("/allTasks", async (req, res) => {

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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.get("/tasks/:id", async (req, res) => {

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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.post("/getMultipleTasks", async (req, res) => {
    console.log(req.body);
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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.post("/deleteTasks/:id", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });
    console.log(req.params.id,req.body);
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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.post("/deleteMulitpleTasks", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const result = await conn.sobject("Task").del(req.body);
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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.post("/addTasks", async (req, res) => {
    console.log(req.body);

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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.post("/updateMultipleTasks", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    console.log(req.body);

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
          msg: "Server Error",
        },
      });
    }
  });

module.exports = router;