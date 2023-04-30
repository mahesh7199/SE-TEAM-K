const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Applicant = require("../models/applicant-model");
const Job = require("../models/jobs-model");
const Recruiter = require("../models/recruiter-model");
const Application = require("../models/application_model");
const Chat = require("../models/chat-model");
const { applicantsData, recruitersData } = require("../data");
const Contact = require("../models/contact-model");
const createJob = async (req, res) => {
  const jobb = await Job.create({
    ...req.body,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Job Created Succesfully" });
};
const getAllJob = async (req, res) => {
  const job = await Job.find({});
  if (job.length === 0) {
    throw new NotFoundError("No Jobs Found");
  }
  res.status(StatusCodes.OK).json({ job });
};

const getAllContacts = async (req, res) => {
  const messages = await Contact.find({});
  if (messages.length === 0) {
    throw new NotFoundError("No Message Found");
  }
  res.status(StatusCodes.OK).json({ messages });
};

const getSingleJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id });
  if (!job) {
    throw new NotFoundError("Job Not Found");
  }
  res.status(StatusCodes.OK).json({ job: job });
};

const getSingleJobSeeker = async (req, res) => {
  const jobSeeker = await Applicant.findOne({ _id: req.params.id });
  if (!jobSeeker) {
    throw new NotFoundError("Job Seeker Not Found");
  }
  res.status(StatusCodes.OK).json({ jobSeeker: jobSeeker });
};

const getSingleRecruiter = async (req, res) => {
  const jobSeeker = await Recruiter.findOne({ _id: req.params.id });
  if (!jobSeeker) {
    throw new NotFoundError("Recruiter Not Found");
  }
  res.status(StatusCodes.OK).json({ jobSeeker: jobSeeker });
};



const updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    throw new NotFoundError("Job does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Job Updated" });
};

const updateApplicant = async (req, res) => {
  const job = await Applicant.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    throw new NotFoundError("Applicant does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Applicant Updated" });
};


const updateRec = async (req, res) => {
  const job = await Applicant.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    throw new NotFoundError("Applicant does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Applicant Updated" });
};



const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete({ _id: req.params.id });
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Job Deleted" });
};

const getRecruiters = async (req, res) => {
  const recruiters = await Recruiter.find({});
  if (recruiters.length === 0) {
    throw new NotFoundError("No recruiters found");
  }
  res.status(StatusCodes.OK).json({ recruiters });
};
const getApplicants = async (req, res) => {
  const applicants = await Applicant.find({});
  if (applicants.length === 0) {
    throw new NotFoundError("No applicants found");
  }
  res.status(StatusCodes.OK).json({ applicants });
};
const populateDB = async (req, res) => {
  const applicants = await Applicant.insertMany(applicantsData);
  const recruiters = await Recruiter.insertMany(recruitersData);
  res.status(StatusCodes.OK).json({ msg: "Users Created" });
};
const getImage = async (req, res) => {
  const recruiter = await Recruiter.findOne({ _id: req.params.id });

  res.status(StatusCodes.OK).json({ img: recruiter.logo });
  // res.sendFile(recruiter.logo);
};
const applyJob = async (req, res) => {
  // const application = await Application.create({ ...req.body, resume: req.file.filename });
  // console.log("Apply job file  resume : ", req.files.resume[0].filename)
  // console.log("Apply job file  coverletter : ", req.files.coverLetter[0].filename)
  const application = await Application.create({ ...req.body, resume: req.files.resume[0].filename, coverLetter: req.files.coverLetter[0].filename});
  res.status(StatusCodes.OK).json({ msg: "Applied Successfully!" });
};

const addContact = async (req, res) => {
  const contact = await Contact.create({ ...req.body });
  res.status(StatusCodes.OK).json({ msg: "Send Successfully!", contact });
};


const getApplications = async (req, res) => {
  const applications = await Application.find({ recruiterId: req.params.id });
  if (applications.length === 0) {
    throw new NotFoundError("No Applications Found");
  }
  res.status(StatusCodes.OK).json({ applications });
};

const updateApplication = async (req, res) => {
  const application = await Application.findOneAndUpdate(
    { _id: req.params.id },
    { applicationStatus: req.body.applicationStatus },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ application });
};

const updateChatNotification2 = async (req, res) => {
  console.log("request body : ", req?.body)
  const chat = await Chat.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ chat });
}

const updateChatNotification = async (req, res) => {
  // router.put("/chat/:chatId/message/:messageId/status", async (req, res) => {
    try {
      const chat = await Chat.findById(req.params.chatId);
  
      if (!chat) {
        return res.status(404).send("Chat not found");
      }
  
      const message = chat.messages.id(req.params.messageId);
  
      if (!message) {
        return res.status(404).send("Message not found");
      }
  
      message.status = req.body.status;
      await chat.save();
  
      res.send(chat);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  
};



const updateApplicationChatStatus = async (req, res) => {
  const application = await Application.findOneAndUpdate(
    { _id: req.params.id },
    { chatStatus: req.body.chatStatus },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ application });
};

const getApplicationsbyJobSeeker = async (req, res) => {
  const applications = await Application.find({ applicantId: req.params.id });
  if (applications.length === 0) {
    throw new NotFoundError("No Applications filed!");
  }
  res.status(StatusCodes.OK).json({ applications });
};
const startChat = async (req, res) => {
  console.log(req.body);
  const chat = await Chat.create({ ...req.body });
  res.status(StatusCodes.OK).json({ msg: "Chat created" });
};

const updateRecruiter = async (req, res) => {
  console.log("*****************************************")
  console.log("*****************************************")
  console.log("*****************************************", req.body)
  const recruiter = await Recruiter.findOneAndUpdate(
    { _id: req.params.id },
    // ...req.body,
    {status: req.body.status},
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ recruiter });

};
const getChats = async (req, res) => {
  const chats = await Chat.find({
    $or: [{ recruiterId: req.params.id }, { applicantId: req.params.id }],
  });
  if (chats.length === 0) {
    throw new NotFoundError("No chats yet");
  }
  res.status(StatusCodes.OK).json({ chats });
};

const message = async (req, res) => {
  console.log("Request received : ", req.body)
  console.log("Request received : ", req.body.sender);
  console.log("Request received : ", req.body.message);
  console.log("Id receviing in params ( 641d490d34f4d27734c152a3 ) : ", req.params.id);
  const chat = await Chat.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        messages: {
          message: req.body.message,
          sender: req.body.sender,
          status: req.body.status,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  console.log("Response response chat : ", chat)

  res.status(StatusCodes.OK).json({ msg: "Message sent", chat });
};

module.exports = {
  createJob,
  getAllJob,
  deleteJob,
  updateJob,
  getSingleJob,
  getSingleJobSeeker,
  getSingleRecruiter,
  getApplicants,
  getRecruiters,
  populateDB,
  getImage,
  applyJob,
  updateApplication,
  getApplicationsbyJobSeeker,
  updateRecruiter,
  startChat,
  message,
  getApplications,
  getChats,
  updateApplicant,
  updateApplicationChatStatus,
  addContact,
  getAllContacts,
  updateChatNotification,
  updateChatNotification2,
};
