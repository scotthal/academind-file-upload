const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "user-images" });
const router = express.Router();

router.get("/", function (req, res) {
  res.render("profiles");
});

router.post("/profiles", upload.single("image"), function (req, res) {
  const uploadedImageFile = req.file;
  const userName = req.body.username;

  console.log(userName);
  console.log(uploadedImageFile);

  res.redirect("/");
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

module.exports = router;
