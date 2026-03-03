const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, "uploads/thumbnails");
    }
    else if (file.fieldname === "trailer") {
      cb(null, "uploads/trailers");
    }
    else if (file.fieldname === "videos") {
      cb(null, "uploads/videos");
    }
    else if (file.fieldname === "avatar_img") {
      cb(null, "uploads/avatars");
    }
    else {
      cb(new Error("Invalid field"), false);
    }
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  }
});

// Filter
const fileFilter = (req, file, cb) => {
  if (
    file.fieldname === "thumbnail" &&
    !file.mimetype.startsWith("image/")
  ) {
    return cb(new Error("Thumbnail must be an image"), false);
  }

  else if (
    file.fieldname === "trailer" &&
    !file.mimetype.startsWith("video/")
  ) {
    return cb(new Error("Trailer must be a video file"), false);
  }
  else if (file.fieldname === "avatar_img" && !file.mimetype.startsWith("image/")) {
    return cb(new Error("Avatar must be an image"), false);
  }

  else if (
    file.fieldname === "videos" &&
    !file.mimetype.startsWith("video/")
  ) {
    return cb(new Error("Videos must be video files"), false);
  }

  cb(null, true);
};

module.exports = multer({ storage, fileFilter });