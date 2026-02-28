// const Course = require("../models/course");
// const Video = require("../models/video");

// class CourseController {
//   // Create course
//   async createCourse({ data, files, user }) {
//     const { title, description, price, sale_price, level, instructor_id } = data;

//     // 👇 PUT YOUR LOGIC HERE
//     let courseInstructorId;

//     if (user.role === "admin") {
//       courseInstructorId = instructor_id || user.id;
//     } else {
//       courseInstructorId = user.id;
//     }

//     const thumbnail = files?.thumbnail ? files.thumbnail[0].filename : null;

//     const course = await Course.create({
//       title,
//       description,
//       price,
//       sale_price,
//       level,
//       thumbnail,
//       instructor_id: courseInstructorId  // 👈 use it here
//     });

//     if (files?.videos) {
//       const videoRecords = files.videos.map(file => ({
//         title: file.originalname,
//         filename: file.filename,
//         duration: req.body[`duration_${file.originalname}`] || "00:00",
//         video_360p: file.fieldname === "video_360p" ? file.filename : null,
//         video_480p: file.fieldname === "video_480p" ? file.filename : null,
//         video_720p: file.fieldname === "video_720p" ? file.filename : null,
//         video_1080p: file.fieldname === "video_1080p" ? file.filename : null,
//         course_id: course.id
//       }));
//       await Video.bulkCreate(videoRecords);
//     }

//     const courseWithVideos = await Course.findByPk(course.id, { include: Video });
//     return courseWithVideos;
//   }

//   // Get all courses
//   async getAll(req, res) {
//     const courses = await Course.findAll({ include: Video });
//     res.json({ data: courses });
//   }

//   // Get course by ID
//   async getById(req, res) {
//     const course = await Course.findByPk(req.params.id, { include: Video });
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.json(course);
//   }

//   // Update course
//   async update(req, res) {
//     const course = await Course.findByPk(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     // Only admin or the instructor who owns the course
//     if (req.user.role !== "admin" && req.user.id !== course.instructor_id)
//       return res.status(403).json({ message: "Forbidden" });

//     const { title, description, price, sale_price, level, instructor_id } = req.body;

//     if (title) course.title = title;
//     if (description) course.description = description;
//     if (price !== undefined) course.price = price;
//     if (sale_price !== undefined) course.sale_price = sale_price;
//     if (level) course.level = level;

//     // Admin can reassign instructor
//     if (req.user.role === "admin" && instructor_id) course.instructor_id = instructor_id;

//     // Update thumbnail
//     if (req.files.thumbnail) course.thumbnail = req.files.thumbnail[0].filename;
//     await course.save();

//     // Add new videos if uploaded
//     if (req.files.videos) {
//       const videoRecords = req.files.videos.map(file => ({
//         title: file.originalname,
//         filename: file.filename,
//         duration: req.body[`duration_${file.originalname}`] || "00:00",
//         course_id: course.id
//       }));
//       await Video.bulkCreate(videoRecords);
//     }

//     const updatedCourse = await Course.findByPk(course.id, { include: Video });
//     res.json({ message: "Course updated", course: updatedCourse });
//   }

//   // Delete course
//   async delete(req, res) {
//     const course = await Course.findByPk(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     if (req.user.role !== "admin" && req.user.id !== course.instructor_id)
//       return res.status(403).json({ message: "Forbidden" });

//     await course.destroy();
//     res.json({ message: "Course deleted" });
//   }
// }

// module.exports = new CourseController();

const Course = require("../models/course");
const Video = require("../models/video");

class CourseService {
  // Create course
  async createCourse({ data, files, user }) {
    const { title, description, price, sale_price, level, instructor_id } = data;

    const courseInstructorId = user.role === "admin" ? instructor_id || user.id : user.id;
    const thumbnail = files?.thumbnail?.[0]?.filename || null;

    const course = await Course.create({
      title,
      description,
      price,
      sale_price,
      level,
      thumbnail,
      instructor_id: courseInstructorId
    });

    // Handle videos (optional qualities)
    if (files?.videos) {
      const videoRecords = files.videos.map(file => ({
        title: file.originalname,
        duration: "00:00", // or update dynamically later
        video_360p: file.fieldname === "video_360p" ? file.filename : null,
        video_480p: file.fieldname === "video_480p" ? file.filename : null,
        video_720p: file.fieldname === "video_720p" ? file.filename : null,
        video_1080p: file.fieldname === "video_1080p" ? file.filename : null,
        course_id: course.id
      }));
      await Video.bulkCreate(videoRecords);
    }

    const courseWithVideos = await Course.findByPk(course.id, { include: Video });
    return courseWithVideos;
  }

  // Update course
  async updateCourse({ courseId, data, files, user }) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new Error("Course not found");

    // Only admin or the instructor who owns the course
    if (user.role !== "admin" && user.id !== course.instructor_id)
      throw new Error("Forbidden");

    const { title, description, price, sale_price, level, instructor_id } = data;

    if (title) course.title = title;
    if (description) course.description = description;
    if (price !== undefined) course.price = price;
    if (sale_price !== undefined) course.sale_price = sale_price;
    if (level) course.level = level;

    // Admin can reassign instructor
    if (user.role === "admin" && instructor_id) course.instructor_id = instructor_id;

    if (files?.thumbnail) course.thumbnail = files.thumbnail[0].filename;

    await course.save();

    // Add or update videos
    if (files?.videos) {
      const videoRecords = files.videos.map(file => ({
        title: file.originalname,
        duration: data[`duration_${file.originalname}`] || "00:00",
        video_360p: file.fieldname === "video_360p" ? file.filename : null,
        video_480p: file.fieldname === "video_480p" ? file.filename : null,
        video_720p: file.fieldname === "video_720p" ? file.filename : null,
        video_1080p: file.fieldname === "video_1080p" ? file.filename : null,
        course_id: course.id
      }));
      await Video.bulkCreate(videoRecords);
    }

    return await Course.findByPk(course.id, { include: Video });
  }

  // Get all courses
  async getAllCourses() {
    return await Course.findAll({ include: Video });
  }

  // Get course by ID
  async getCourseById(courseId) {
    return await Course.findByPk(courseId, { include: Video });
  }

  // Delete course
  async deleteCourse({ courseId, user }) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new Error("Course not found");

    if (user.role !== "admin" && user.id !== course.instructor_id)
      throw new Error("Forbidden");

    await course.destroy();
    return { message: "Course deleted" };
  }
}

module.exports = new CourseService();