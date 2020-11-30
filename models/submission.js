const mongoose = require("mongoose");

const submission = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim:true
      },
      type: {
        type: String,
        required: true,
        trim:true
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now
        }
});

module.exports = mongoose.model("submissions", submission);
