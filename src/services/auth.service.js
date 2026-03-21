const { User } = require("../models/model");
const userResponseDTO = require("../dto/user.dto");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require("../utils/jwt.util");

class AuthService {

    async register(data) {
        const { phone_num, email, password, confirm_password, role } = data;

        // validate required fields
        if (!phone_num || !email || !password || !confirm_password || !role) {
            throw new Error("Missing required fields: phone_num, email, password, role");
        }

        //  check if passwords match
        if (password !== confirm_password) {
            throw new Error("Passwords do not match");
        }

        // check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) throw new Error("User already exists");

        // hash password
        const hashed = await hashPassword(password);

        // create user with minimal fields
        const user = await User.create({
            phone_num,
            email,
            password: hashed,
            role
        });

        // generate tokens
        const accessToken = generateAccessToken({ id: user.id, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id });
        user.refresh_token = refreshToken;
        await user.save();

        return {
            user: userResponseDTO(user),
            accessToken,
            refreshToken
        };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role
        });

        const refreshToken = generateRefreshToken({ id: user.id });

        user.refresh_token = refreshToken;
        await user.save();

        return { user, accessToken, refreshToken };
    }

    async refresh(token) {
        const decoded = verifyRefreshToken(token);

        const user = await User.findByPk(decoded.id);
        if (!user || user.refresh_token !== token) {
            throw new Error("Invalid refresh token");
        }

        const newAccessToken = generateAccessToken({
            id: user.id,
            role: user.role
        });

        return newAccessToken;
    }

    async logout(token) {
        const decoded = verifyRefreshToken(token);

        const user = await User.findByPk(decoded.id);
        if (!user) throw new Error("User not found");

        user.refresh_token = null;
        await user.save();
    }
}

module.exports = new AuthService();