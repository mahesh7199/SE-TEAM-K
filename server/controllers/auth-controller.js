const Recruiter = require("../models/recruiter-model");
const Applicant = require("../models/applicant-model");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => { 
  const {email} = req.body;
  const newRecruiter = await Recruiter.findOne({
    email: email,
  });

  if(newRecruiter){
    console.log("check if email exist : ", newRecruiter);
    throw new UnauthenticatedError("Email already exist. please provide unique email.");
  }

  const recruiter = await Recruiter.create({
    ...req.body,
    logo: req.file.filename,
  });
  const token = await recruiter.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};


const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }
  const newRecruiter = await Recruiter.findOne({
    email: username,
  });


  if (!newRecruiter) {
    console.log(newRecruiter);
    throw new UnauthenticatedError("User not found");
  }

  const isPasswordCorrect = await newRecruiter.comparePassword(req.body.password);

  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Your passwrod is not correct');
  }

  const token = newRecruiter.createJWT();

  res.status(StatusCodes.OK).json({ msg: "Login successful", user: newRecruiter, token });
};

const applicationLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }
  const applicant = await Applicant.findOne({
    email: username,
  });

  if (!applicant) {
    console.log(applicant);
    throw new UnauthenticatedError("User not found");
  }

  const isPasswordCorrect = await applicant.comparePassword(req.body.password);

  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Your passwrod is not correct');
  }


  const token = applicant.createJWT();
  res.status(StatusCodes.OK).json({ msg: "Login successful", token, id: applicant._id, profilePic: applicant.profilePic });
};

const applicationRegister = async (req, res) => {
  const {email} = req.body;
  const newApplicant = await Applicant.findOne({
    email: email,
  });

  if(newApplicant){
    console.log("check if email exist : ", newApplicant);
    throw new UnauthenticatedError("Email already exist. please provide unique email.");
  }

  console.log("Profile pic : ", req.file);
  const applicant = await Applicant.create({
    ...req.body,
    profilePic: req.file.filename,
  });
  const token = await applicant.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};

module.exports = {
  login,
  register,
  applicationLogin,
  applicationRegister,
};
