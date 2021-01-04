var dotenv = require("dotenv");
var jsforce = require("jsforce");
const express = require("express");
const axios = require("axios");
var jwt = require("jsonwebtoken");
const checkAuth = require("../middlewares/checkAuth");

var jsforce = require('jsforce');
const salesforceUserSchema = require("../models/salesforceUser");
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


router.get('/auth/token/:code', async (req, res)=> {
  var conn = new jsforce.Connection({ oauth2 : oauth2 });
  var code = req.params.code;
  conn.authorize(code, async function(err, userInfo) {
    if (err) { return res.send(err.message); }

    const payload = {
      access_token: conn.accessToken,
      refresh_token: conn.refreshToken,
      instance_url: conn.instanceUrl,
      User_ID: userInfo.id,
      Org_ID: userInfo.organizationId,
      Modified_at: Date.now()
    }
    try{
      let result = await salesforceUserSchema.find({"User_ID": userInfo.id});
      if(result.length > 0){
          result[0].access_token = conn.accessToken;
          result[0].refresh_token = conn.refreshToken;
          result[0].Modified_at = Date.now();

          try{
            const newSchema = new salesforceUserSchema(result[0]);
            const results = await newSchema.save();
            console.log(results);
            if(results){
              let token = await jwt.sign({
                data: {
                  instance_url:conn.instanceUrl,
                  User_ID:userInfo.id
                }
              }, process.env.JWT_SECRET, { expiresIn: '30d' });
      
              res.json({
                statusCode:200,
                payload:{
                  msg:"success",
                  data:token
                }
              })
            }
          }catch(err){
            res.json({
              statusCode: 500,
              payload:{
                  msg:err.message,
              }
          })
          }

      }
      else{
        const newSchema = new salesforceUserSchema(payload);

        try{
          const result = await newSchema.save();
          if(result){
            let token = await jwt.sign({
              data: {
                instance_url:conn.instanceUrl,
                User_ID:userInfo.id
              }
            }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
            res.json({
              statusCode:200,
              payload:{
                msg:"success",
                data:token
              }
            })
          }
        }
        catch(err){
          res.json({
            statusCode: 500,
            payload:{
                msg:err.message,
            }
        })
        }
      }
    }
    catch(err){
      res.json({
        statusCode: 500,
        payload:{
            msg:err.message,
        }
    })
    }
    
  })
});

router.post("/auth/refresh" , [checkAuth], async(req,res)=>{

  console.log(req.body.User_ID);
  
  try{
    salesforceUserSchema.find({"User_ID": req.body.User_ID})
    .then((data)=>{
      let refreshToken = data[0].refresh_token ;
        var conn = new jsforce.Connection({ oauth2 : oauth2 });
        conn.oauth2.refreshToken(refreshToken, async(err, results) => {
          if (err) {
            console.log(err);
            return res.json({
            statusCode:500,
            payload:{
              msg:" Salesforce Session Validity Expired!. Login again."
            }
          })
        }
          
          data[0].access_token = results.access_token;

          try{
            const result = await data[0].save();
            if(result){
              let token = jwt.sign({  
                data: {
                  instance_url:result.instance_url,
                  User_ID:result.User_ID
                }
              }, process.env.JWT_SECRET, { expiresIn: '30d' });
      
              res.json({
                statusCode:200,
                payload:{
                  msg:"success",
                  data:token
                }
              })
            }
          }
          catch(err){
            res.json({
              statusCode: 500,
              payload:{
                  msg:err.message,
              }
          })
          }
        });
    })
    .catch((err)=>{
      console.log(err);
    })

    }
  catch(err){
    res.json({
      statusCode: 500,
      payload:{
          msg:err.message,
      }
  })
  }

})
module.exports = router;