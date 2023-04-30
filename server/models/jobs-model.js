require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jobSchema = new mongoose.Schema({
  jobName: {
    type: String,
    // required: [true, "Please Provide Name"],
  },
  recruiterId: {
    type: String,
    // required: [true, "Please Provide Name"],
  },
  jobDescription: {
    type: String,
  },
  qualificationsReq: {
    type: String,
  },
  city: {
    type: String,
  },
  minSalary: {
    type: String,
  },
  maxSalary: {
    type: String,
  },
  jobType: {
    type: String,
  },
  datee: {
    type: String,
  },
  jobStatus: {
    type: String,
    default: "Active",
  },
  companyEmail: {
    type: String,
  },
});
module.exports = mongoose.model("Job", jobSchema);
