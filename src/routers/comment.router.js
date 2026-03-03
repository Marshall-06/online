const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/comment.controller");

// Add comment
router.post("/", auth, controller.add);

// Get all comments of a course
router.get("/:courseId", controller.get);

// Delete comment
router.delete("/:commentId", auth, controller.delete);

module.exports = router;