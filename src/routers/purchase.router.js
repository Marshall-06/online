const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const purchaseController = require("../controllers/purchase.controller");

// Save course after purchase
router.post("/save", auth, purchaseController.saveCourse);

// Get saved courses
router.get("/saved", auth, purchaseController.getSavedCourses);

module.exports = router;