const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  phone_num: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("admin", "instructor", "user"), defaultValue: "user" },

  // after registration, user can set name, username and avatar to profile
  name: { type: DataTypes.STRING, allowNull: true },
  username: { type: DataTypes.STRING, allowNull: true },
  avatar_img: { type: DataTypes.STRING, allowNull: true },
  refresh_token: { type: DataTypes.STRING, allowNull: true },

});

module.exports = User;