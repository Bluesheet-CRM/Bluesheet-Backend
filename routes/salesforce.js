var dotenv = require("dotenv");
var jsforce = require("jsforce");
const express = require("express");
const axios = require("axios");
var jsforce = require('jsforce');

const router = express.Router();
dotenv.config();

var oauth2 = new jsforce.OAuth2({
  loginUrl : 'https://login.salesforce.com',
  clientId : process.env.CONSUMER_KEY,
  clientSecret : process.env.CONSUMER_SECRET,
  redirectUri : process.env.REDIRECT_URI
});

router.get('/auth/login', function(req, res) {
  res.redirect(oauth2.getAuthorizationUrl({ scope : 'api id web refresh_token offline_access' }));
});


router.get('/auth/token/:code', function(req, res) {
  var conn = new jsforce.Connection({ oauth2 : oauth2 });
  var code = req.params.code;
  console.log(code);
  conn.authorize(code, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token, refresh token, and instance URL information.
    // Save them to establish connection next time.
    console.log("profile",conn)
    console.log("access_token",conn.accessToken);
    console.log("refresh_token",conn.
    
    
    efreshToken);
    console.log("instance url",conn.instanceUrl);
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    console.log("user info",userInfo);
    // ...
    res.json({
        statusCode: 200,
        payload:{
            msg:"success",
            data:{
                url: conn.instanceUrl,
                token: conn.accessToken
            }
        }
    }) // or your desired response
  });
});


module.exports = router;