const CommentService = require("../services/comment.service");

class CommentController {
  async add(req, res) {
    try {
      const comment = await CommentService.addComment(
        req.user.id,
        req.body.course_id,
        req.body.content
      );
      res.status(201).json(comment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async get(req, res) {
    try {
      const comments = await CommentService.getComments(req.params.courseId);
      res.json({ data: comments });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await CommentService.deleteComment(
        req.params.commentId,
        req.user
      );
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new CommentController();