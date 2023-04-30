require("dotenv").config();
const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema({
  recruiterId: {
    type: String,
  },
  jobId: {
    type: String,
  },
  applicantId: {
    type: String,
  }, 
  jobName: {
    type: String,
  },
  jobDescription: {
    type: String,
  },  
  city: {
    type: String,
  },
  datee: {
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
  message: {
    type: String,
  },
  resume: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
  chatStatus: {
    type: String,
    enum: ["Initiated", "Pending"],
    default: "Pending",
  },
  applicationStatus: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending"],
    default: "Pending",
  },
});
module.exports = mongoose.model("Application", applicationSchema);
