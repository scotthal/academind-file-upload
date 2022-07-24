const crypto = require("crypto");
const express = require("express");
const multer = require("multer");
const path = require("path");

const db = require("../data/database");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "user-images");
    },
    filename: function (req, file, cb) {
      return cb(null, crypto.randomUUID() + path.extname(file.originalname));
    },
  }),
});
const router = express.Router();

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users: users });
});

router.post("/profiles", upload.single("image"), async function (req, res) {
  const uploadedImageFile = req.file;
  const userName = req.body.username;

  db.getDb().collection("users").insertOne({
    name: userName,
    imagePath: uploadedImageFile.path,
  });

  res.redirect("/");
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

module.exports = router;
