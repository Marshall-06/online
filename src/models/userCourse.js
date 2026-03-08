const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Course = require("./course");

const UserCourse = sequelize.define("UserCourse", {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    course_id: { type: DataTypes.INTEGER, allowNull: false },
    purchased_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});


module.exports = UserCourse;