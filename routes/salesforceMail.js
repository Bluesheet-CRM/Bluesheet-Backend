const express = require("express");
var jsforce = require("jsforce");
const axios = require("axios");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

router.post("/email", [checkAuth], async (req, res) => {
  var conn = new jsforce.Connection({
    instanceUrl: req.body.url,
    accessToken: req.body.token,
  });

  try {
    const data = await conn.query("SELECT Id FROM EmailMessage");
    res.json({
      statusCode: 200,
      payload: {
        data: data,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      statusCode: 500,
      payload: {
        msg: err.message,
      },
    });
  }
});

router.post("/mutipleEmailMessage", [checkAuth], async (req, res) => {
  var conn = new jsforce.Connection({
    instanceUrl: req.body.url,
    accessToken: req.body.token,
  });

  try {
    const result = await conn.sobject("EmailMessage").retrieve(req.body.id);
    res.json({
      statusCode: 200,
      payload: {
        data: result,
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
router.post("/sendEmail", [checkAuth], async (req, res) => {
  console.log(req.body.data);
  axios({
    method: "post",
    url: `${req.body.url}/services/data/v50.0/actions/standard/emailSimple`,
    data: req.body.data,
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      res.json({
        statusCode: 200,
        payload: {
          msg: "Success",
          data: data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        statusCode: 500,
        payload: {
          msg: err.message,
        },
      });
    });
});

router.post("/addEmail", [checkAuth], async (req, res) => {
  var conn = new jsforce.Connection({
    instanceUrl: req.body.url,
    accessToken: req.body.token,
  });
  try {
    const data = await conn
      .sobject("EmailMessage")
      .create(req.body.emailMessage);
    res.json({
      statusCode: 200,
      payload: {
        data: data,
      },
    });
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

router.post("/updateEmail", [checkAuth], async (req, res) => {
  try {
    const data = await conn.sobject("EmailMessage").update(req.body);
    res.json({
      statusCode: 200,
      payload: {
        msg: "success",
        data: data,
      },
    });
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

router.delete("/deleteEmailMessage/:id", [checkAuth], async (req, res) => {
  var conn = new jsforce.Connection({
    instanceUrl: req.body.url,
    accessToken: req.body.token,
  });
  try {
    const data = await conn.sobject("EmailMessage").destroy(req.params.id);
    res.json({
      statusCode: 200,
      payload: {
        msg: "success",
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
