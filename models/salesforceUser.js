const mongoose = require("mongoose");

const salesforceUserSchema = mongoose.Schema({
    access_token: {
        type: String,
        required: true,
        trim:true
      },
      refresh_token: {
        type: String,
        required: true,
        trim:true
      },
      instance_url: {
        type: String,
        required: true,
        trim:true
      },
      User_ID:{
        type: String,
        required: true,
        trim:true
      },
      Org_ID:{
        type: String,
        required: true,
        trim:true
      },
      Created_at:{
        type: Date,
        required: true,
        default: Date.now()
      },
      Modified_at:{
        type:Date,
        required: true
      }
})


module.exports = mongoose.model("salesforceUser",salesforceUserSchema);