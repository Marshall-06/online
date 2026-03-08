const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/profile.controller");

// Get profile
router.get("/", auth, controller.getProfile);

// Update profile
router.put("/", auth, upload.single("avatar_img"), controller.updateProfile);

module.exports = router;