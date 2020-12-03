const express = require("express");
var jsforce = require("jsforce");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
router.post("/allOpportunities", [checkAuth], async (req, res) => {

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

        res.json({
          statusCode: 500,
          payload: {
            msg: err.message,
          },
        });
      
      
    }
  });
  
  router.get("/opportunity/:id", [checkAuth], async (req, res) => {

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
          msg: err.message,
        },
      });
    }
  });
  
  router.post("/getMultipleRecords",[checkAuth], async (req, res) => {
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
          msg: err.message,
        },
      });
    }
  });
  
  router.post("/delete/:id", [checkAuth], async (req, res) => {

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
          msg: err.message,
        },
      });
    }
  });
  
  router.post("/deleteMulitple", [checkAuth], async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const result = await conn.sobject("Account").del(req.body);
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
  
  router.post("/addOpportunity", [checkAuth], async (req, res) => {
  
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
      res.json({
        statusCode: 500,
        payload: {
          msg: err.message,
        },
      });
    }
  });
  
  router.post("/updateMultiple", [checkAuth], async (req, res) => {
    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

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
          msg: err.message,
        },
      });
    }
  });

module.exports = router;