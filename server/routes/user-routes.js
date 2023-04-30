const express = require("express");
const router = express.Router();
const {
  createJob,
  updateJob,
  getAllJob,
  getSingleJob,
  deleteJob,
  getRecruiters,
  getApplicants,
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
  getSingleJobSeeker,
  getSingleRecruiter,
  updateApplicant,
  updateApplicationChatStatus,
  addContact,
  getAllContacts,
  updateChatNotification,
  updateChatNotification2
} = require("../controllers/user-controller");

router.route("/jobs").post(createJob).get(getAllJob);
router.route("/job/:id").delete(deleteJob).get(getSingleJob).patch(updateJob);
//new
// applicant's application on a specific job


// router.post("/applicant/apply", applyJob);


// recruiter's get applications
router.get("/recruiter/get-applications/:id", getApplications);
//recruiter update job status
router.patch("/recruiter/application/:id", updateApplication);
router.patch("/recruiter/application/chatstatus/:id", updateApplicationChatStatus);
// applicant's applications history
router.get("/applicant/jobs/:id", getApplicationsbyJobSeeker);
//edit recruiter bio
router.patch("/recruiter/update/:id", updateRecruiter);
//fetch chats
router.get("/all-chats/:id", getChats);
//recruiter starts chat
router.post("/recruiter/start-chat", startChat);
router.post("/contact", addContact);
router.get("/contact", getAllContacts);

//recruiter messagge
router.patch("/chat/message/:id", message);
router.patch("/chat/:chatId/message/:messageId/status", updateChatNotification);
router.patch("/chat/notification/:id", updateChatNotification2);

//__________________
router.get("/users/recruiters", getRecruiters);
router.get("/users/recruiter/:id", getSingleRecruiter);
router.get("/users/applicant/:id", getSingleJobSeeker);
router.patch("/users/applicant/update/:id", updateApplicant);
router.get("/users/applicants", getApplicants);
router.get("/populate-db", populateDB);
router.get("/get-image/:id", getImage);

module.exports = router;
