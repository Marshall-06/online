const User = require("./user")
const Course = require("./course")
const Video = require("./video")
const CourseLike = require("./courseLike");

// Course belongs to Instructor
Course.belongsTo(User, { as: "instructor", foreignKey: "instructor_id" });
User.hasMany(Course, { foreignKey: "instructor_id" });

// Course has many Videos
Course.hasMany(Video, { foreignKey: "course_id" });
Video.belongsTo(Course, { foreignKey: "course_id" });


// Many-to-Many: User <-> Course through CourseLike
User.belongsToMany(Course, {
  through: CourseLike,
  foreignKey: "user_id"
});

Course.belongsToMany(User, {
  through: CourseLike,
  foreignKey: "course_id"
});

module.exports = {
    User,
    Course,
    Video,
    CourseLike
};