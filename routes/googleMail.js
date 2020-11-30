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


// {
//     access_token: 'ya29.a0AfH6SMCrKSym1LoCUbO-YMPNdm5-3f8WgFFXMZY9U2dbrgAKJhS0qUXxtQaQ63ESXVjn_asc_3KXxCBTS57a8K6gQfnfBthzEkTPEzi3H_f8soKKoz0GHrUIp8UI6Fu9qbv1WECCLmJjgCFrByBBVJc8dB6BnenGfIPHYtXR_w0',
//     refresh_token: '1//0gkg6MEWMO7aYCgYIARAAGBASNwF-L9IrORjobcwrwWroD-2E7wUtdc3u72pL1udtWMMWhOIae4qtbc2kw6uhdVlR8KGPrQIYnbs',
//     scope: 'https://www.googleapis.com/auth/gmail.readonly',
//     token_type: 'Bearer',
//     expiry_date: 1606463103727
//   }