const express = require("express");
var jsforce = require("jsforce");
const router = express.Router();

router.post("/allNotes", async (req, res) => {

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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.get("/notes/:id", async (req, res) => {

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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.post("/getMultipleNotes", async (req, res) => {
    console.log(req.body);
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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.post("/deleteNotes/:id", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });
    console.log(req.params.id,req.body);
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
          msg: "Server Error",
        },
      });
    }
  });
  
  router.post("/deleteMulitpleNotes", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const result = await conn.sobject("Note").del(req.body);
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
  
  router.post("/addNotes", async (req, res) => {
    console.log(req.body);

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
  
  router.post("/updateMultipleNotes", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    console.log(req.body);

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
          msg: "Server Error",
        },
      });
    }
  });

module.exports = router;