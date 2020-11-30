const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userDetails = require("./models/User");
var jwt = require("jsonwebtoken");
var jwt1 = require("jwt-simple");
const Auth = require("./routes/user");
const Pipelines = require("./routes/data");
const Salesforce = require("./routes/salesforce");
const salesforcePipeline = require("./routes/salesforcePipeline");
const salesforceNotes = require("./routes/salesforceNotes");
const salesforceTasks = require("./routes/salesforceTasks");
const salesforceMails = require("./routes/salesforceMail");
const googleMail = require("./routes/googleMail");
const submission = require("./models/submission");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.use(Auth);
app.use(Pipelines);
app.use(Salesforce);
app.use(salesforcePipeline);
app.use(salesforceNotes);
app.use(salesforceTasks);
app.use(salesforceMails);
app.use(googleMail);


app.use(express.urlencoded({ extended: false }));

mongoose.connect(
    process.env.ATLAS_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        return console.log({
          error: err,
          message: "Database error",
        });
      }
      return console.log("Connected to MongoDB");
    }
  );


app.post("/bluesheet/submission", async(req,res)=>{
    const newSubmission = new submission(req.body);
    try{
        const result = await newSubmission.save();
        if(result){
            res.json({
                status:200,
                msg:"saved"
            })
        }
    }catch(err){
        res.json({
            status:500,
            msg:err.message
        })
    }
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
