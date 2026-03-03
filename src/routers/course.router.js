const express = require("express");
const router = express.Router();
const controller = require("../controllers/course.controller");
const auth = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

// Public
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// Protected
router.post(
  "/",
  auth,
  authorizeRoles("admin", "instructor"), 
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
    { name: "videos" }
  ]),
  controller.create
);

router.put(
  "/:id",
  auth,
  authorizeRoles("admin", "instructor"), 
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videos" }
  ]),
  controller.update
);

router.delete(
  "/:id",
  auth,
  authorizeRoles("admin", "instructor"), // ✅ FIXED
  controller.delete
);

module.exports = router;