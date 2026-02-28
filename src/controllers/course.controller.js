const CourseService = require("../services/course.service");

class CourseController {
  // Create course
  async create(req, res) {
    try {
      const course = await CourseService.createCourse({
        data: req.body,
        files: req.files,
        user: req.user
      });
      res.status(201).json({ message: "Course created", course });
    } catch (err) {
      console.error(err);
      const status = err.message === "Forbidden" ? 403 : 500;
      res.status(status).json({ message: err.message });
    }
  }

  // Update course
  async update(req, res) {
    try {
      const course = await CourseService.updateCourse({
        courseId: req.params.id,
        data: req.body,
        files: req.files,
        user: req.user
      });
      res.json({ message: "Course updated", course });
    } catch (err) {
      console.error(err);
      const status = err.message === "Forbidden" ? 403 : err.message === "Course not found" ? 404 : 500;
      res.status(status).json({ message: err.message });
    }
  }

  // Get all courses
  async getAll(req, res) {
    try {
      const courses = await CourseService.getAllCourses();
      res.json({ data: courses });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // Get course by ID
  async getById(req, res) {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // Delete course
  async delete(req, res) {
    try {
      const result = await CourseService.deleteCourse({
        courseId: req.params.id,
        user: req.user
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      const status = err.message === "Forbidden" ? 403 : err.message === "Course not found" ? 404 : 500;
      res.status(status).json({ message: err.message });
    }
  }
}

module.exports = new CourseController();