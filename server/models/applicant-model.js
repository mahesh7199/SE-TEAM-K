require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
  },
  contactnumber: {
    type: String,
    required: [true, "Please Provide Contact Number"],
  },
  profilePic: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "Please Provide City"],
  },
  country: {
    type: String,
  },
  qualifications: {
    type: String,
  },
  experience: {
    type: String,
  },
  desiredJob: {
    type: String,
  },
  description: {
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
});
applicantSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});
applicantSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_Lifetime,
    }
  );
};
applicantSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("Applicant", applicantSchema);
