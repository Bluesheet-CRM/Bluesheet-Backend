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


app.use(express.urlencoded({ extended: false }));

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
