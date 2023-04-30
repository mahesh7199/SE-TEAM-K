require("dotenv").config();
const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  recruiterId: {
    type: String,
  },
  applicantId: {
    type: String,
  },
  recName: {
    type: String,
  },
  jsName: {
    type: String,
  },
  messages: [
    {
      message: String,
      sender: String,
      status: String,
    },
  ],
});
module.exports = mongoose.model("Chat", chatSchema);
