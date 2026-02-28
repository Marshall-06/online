const User = require("./user")
const Course = require("./course")
const Video = require("./video")

// Course belongs to Instructor
Course.belongsTo(User, { as: "instructor", foreignKey: "instructor_id" });
User.hasMany(Course, { foreignKey: "instructor_id" });

// Course has many Videos
Course.hasMany(Video, { foreignKey: "course_id" });
Video.belongsTo(Course, { foreignKey: "course_id" });

module.exports = {
    User,
    Course,
    Video
};