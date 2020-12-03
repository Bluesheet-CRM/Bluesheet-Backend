const express = require("express");
var jsforce = require("jsforce");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

router.post("/allNotes",[checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const data = await conn.query("SELECT Id FROM Note");
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
  
  router.get("/notes/:id",[checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    console.log(req.params.id);
    try {
      const data = await conn.sobject("Note").retrieve(req.params.id);
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
  
  router.post("/getMultipleNotes",[checkAuth], async (req, res) => {
    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const result = await conn.sobject("Note").retrieve(req.body.id);
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
  
  router.post("/deleteNotes/:id", [checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });
    try {
      const data = await conn.sobject("Note").destroy(req.params.id);
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
  
  router.post("/deleteMulitpleNotes",[checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const result = await conn.sobject("Note").del(req.body);
      res.json({
        statusCode: 200,
        payload: {
          data: "success",
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
  
  router.post("/addNotes",[checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const data = await conn.sobject("Note").create(req.body.data);
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
  
  router.post("/updateMultipleNotes",[checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });


    try {
      const data = await conn.sobject("Note").update(req.body.editValue);
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