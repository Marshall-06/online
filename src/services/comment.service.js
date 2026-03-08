const Comment = require("../models/comment");
const Course = require("../models/course");

class CommentService {
  // Add comment
  async addComment(userId, courseId, content) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new Error("Course not found");

    const comment = await Comment.create({
      user_id: userId,
      course_id: courseId,
      content
    });

    return comment;
  }

  // Get all comments for a course
  async getComments(courseId) {
    const comments = await Comment.findAll({
      where: { course_id: courseId },
      include: [{ model: require("../models/user"), attributes: ["id","name","avatar_img"] }],
      order: [["createdAt", "DESC"]]
    });

    return comments;
  }

  // Delete comment (only author or admin)
  async deleteComment(commentId, user) {
    const comment = await Comment.findByPk(commentId);
    if (!comment) throw new Error("Comment not found");

    if (user.role !== "admin" && user.id !== comment.user_id) {
      throw new Error("Forbidden");
    }

    await comment.destroy();
    return { message: "Comment deleted" };
  }
}

module.exports = new CommentService();