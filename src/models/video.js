const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Video = sequelize.define("Video", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING, // "05:32"
        allowNull: false
    },
    course_id: { type: DataTypes.INTEGER, allowNull: false },

    // video files by resolution
    video_360p: {
        type: DataTypes.STRING,
        allowNull: true
    },
    video_480p: {
        type: DataTypes.STRING,
        allowNull: true
    },
    video_720p: {
        type: DataTypes.STRING,
        allowNull: true
    },
    video_1080p: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Video;