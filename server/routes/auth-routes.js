const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const {
  login,
  register,
  applicationLogin,
  applicationRegister,
} = require("../controllers/auth-controller");
const { applyJob } = require("../controllers/user-controller");

router.post("/recruiter/login", login);
router.post("/recruiter/register", upload.single("logo"), register);

// router.post("/applicant/apply", upload.single("resume"), applyJob);

router.post("/applicant/apply", upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 }
]), applyJob);

router.post("/applicant/login", applicationLogin);
router.post(
  "/applicant/register",
  upload.single("profilePic"),
  applicationRegister
);

module.exports = router;
