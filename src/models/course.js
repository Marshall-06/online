const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Course = sequelize.define("Course", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  sale_price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  level: {
    type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trailer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  views: {
  type: DataTypes.INTEGER,
  defaultValue: 0
},
});


module.exports = Course;