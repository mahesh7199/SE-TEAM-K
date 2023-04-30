require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const recruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
  },
  contactnumber: {
    type: String,
    required: [true, "Please Provide Contact Number"],
  },
  companyName: {
    type: String,
    required: [true, "Please Provide Company Name"],
  },
  companyLink: {
    type: String
  },
  logo: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid and Unique email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
  status: {
    type: String,
    enum: ["Approved", "Blocked", "Pending"],
    default: "Pending",
  },
});


recruiterSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});
recruiterSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_Lifetime,
    }
  );
};
recruiterSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("Recruiter", recruiterSchema);
