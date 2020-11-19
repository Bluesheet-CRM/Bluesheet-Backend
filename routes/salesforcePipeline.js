const express = require("express");
var jsforce = require("jsforce");
const router = express.Router();

router.post("/allOpportunities", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const data = await conn.query("SELECT Id FROM Opportunity");
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
  
  router.get("/opportunity/:id", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    console.log(req.params.id);
    try {
      const data = await conn.sobject("Opportunity").retrieve(req.params.id);
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
  
  router.post("/getMultipleRecords", async (req, res) => {
    console.log(req.body);
    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const result = await conn.sobject("Opportunity").retrieve(req.body.id);
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
  
  router.post("/delete/:id", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });
    console.log(req.params.id,req.body);
    try {
      const data = await conn.sobject("Opportunity").destroy(req.params.id);
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
  
  router.post("/deleteMulitple", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const result = await conn.sobject("Account").del(req.body);
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
  
  router.post("/addOpportunity", async (req, res) => {
    console.log(req.body);

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const data = await conn.sobject("Opportunity").create(req.body.data);
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
  
  router.post("/updateMultiple", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    console.log(req.body);

    try {
      const data = await conn.sobject("Opportunity").update(req.body.editValue);
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