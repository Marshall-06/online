const Course = require("../models/course");
const Video = require("../models/video");
const CourseLike = require("../models/courseLike");
const User = require("../models/user");
const UserCourse = require("../models/userCourse");

class CourseService {
  // Create course
  async createCourse({ data, files, user }) {
    const { title, description, price, sale_price, level, instructor_id } = data;

    const courseInstructorId = user.role === "admin" ? instructor_id || user.id : user.id;
    const thumbnail = files?.thumbnail?.[0]?.filename || null;
    const trailer = files?.trailer?.[0]?.filename || null;

    const course = await Course.create({
      title,
      description,
      price,
      sale_price,
      level,
      thumbnail,
      trailer,
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
    if (files?.trailer) course.trailer = files.trailer[0].filename;

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
  async incrementView(courseId) {
    const course = await Course.findByPk(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    course.views += 1;

    await course.save();

    return course.views;
  }

  async likeCourse(courseId, userId) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new Error("Course not found");

    // check if already liked
    const existing = await CourseLike.findOne({
      where: { course_id: courseId, user_id: userId }
    });

    if (existing) {
      throw new Error("Already liked");
    }

    await CourseLike.create({
      course_id: courseId,
      user_id: userId
    });

    return { message: "Course liked successfully" };
  }

  async unlikeCourse(courseId, userId) {
    const like = await CourseLike.findOne({
      where: { course_id: courseId, user_id: userId }
    });

    if (!like) throw new Error("Like not found");

    await like.destroy();

    return { message: "Course unliked successfully" };
  }

  async getLikedCourses(userId) {
    const user = await User.findByPk(userId, {
      include: {
        model: Course,
        through: { attributes: [] }
      }
    });

    if (!user) throw new Error("User not found");

    return user.Courses;
  }

  async enrollCourse(userId, courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new Error("Course not found");

    const alreadyEnrolled = await UserCourse.findOne({
      where: { user_id: userId, course_id: courseId },
    });
    if (alreadyEnrolled) throw new Error("Already enrolled");

    const enrollment = await UserCourse.create({
      user_id: userId,
      course_id: courseId,
    });

    return enrollment;
  }

  // Get all saved/enrolled courses for a user
  async getMyCourses(userId) {
    return await Course.findAll({
      include: [
        {
          model: UserCourse,
          where: { user_id: userId },
          attributes: [],
        },
        {
          model: Video,
        },
      ],
    });
  }

}

module.exports = new CourseService();