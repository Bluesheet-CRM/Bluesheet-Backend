const express = require("express");
const {google} = require('googleapis');
const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URIS
  );
  
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = 'https://www.googleapis.com/auth/gmail.readonly';
  
  router.get("/getMail",(req,res)=>{
      console.log("route hit...")
    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
      
        // If you only need one scope you can pass it as a string
        scope: scopes
      });
      console.log(url);
      res.redirect(url);
      
  })
  router.get("/auth/callback",async (req,res)=>{
    console.log(req.query.code);
    const {tokens} = await oauth2Client.getToken(req.query.code);
    console.log(tokens);
    oauth2Client.setCredentials(tokens);
  })




module.exports = router;


