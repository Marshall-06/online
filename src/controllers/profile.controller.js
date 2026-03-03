const User = require("../models/user");

class ProfileController {
    // GET /profile
    async getProfile(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            // Only return the safe fields
            const userResponse = {
                id: user.id,
                name: user.name,
                username: user.username,
                phone_num: user.phone_num,
                email: user.email,
                // role: user.role,
                avatar_img: user.avatar_img,
            };

            res.json({ user: userResponse });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // PUT /profile
    async updateProfile(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            const { name, username, phone_num } = req.body;

            if (name) user.name = name;
            if (username) user.username = username;
            if (phone_num) user.phone_num = phone_num;

            // Update avatar if a file is uploaded
            if (req.file) {
                user.avatar_img = req.file.filename;
            }

            await user.save();

            // Return only safe fields
            const userResponse = {
                id: user.id,
                name: user.name,
                username: user.username,
                phone_num: user.phone_num,
                // email: user.email,
                // role: user.role,
                avatar_img: user.avatar_img,
            };

            res.json({ message: "Profile updated", user: userResponse });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new ProfileController();