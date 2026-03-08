const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CourseLike = sequelize.define("CourseLike", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = CourseLike;