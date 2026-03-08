const User = require("../models/user");

class ProfileService {
  // Get profile by user id
  async getProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "username", "phone_num", "email", "role", "avatar_img"]
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  // Update profile
  async updateProfile(userId, data, files) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const { name, username, phone_num } = data;

    if (name !== undefined) user.name = name;
    if (username !== undefined) user.username = username;
    if (phone_num !== undefined) user.phone_num = phone_num;

    // Handle avatar upload
    if (files?.avatar_img) {
      user.avatar_img = files.avatar_img[0].filename;
    }

    await user.save();
    return user;
  }
}

module.exports = new ProfileService();