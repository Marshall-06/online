const authService = require("../services/auth.service");
const { userResponseDTO } = require("../dto/user.dto");

//register
exports.register = async (req, res) => {
    try {
        const { user, accessToken } =
            await authService.register(req.body);

        res.status(201).json({
            accessToken,
            user: userResponseDTO(user)
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { user, accessToken, refreshToken } =
            await authService.login(email, password);

        res.json({
            accessToken,
            refreshToken,
            user: userResponseDTO(user)
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
//refresh token
exports.refresh = async (req, res) => {
    try {
        const newAccessToken =
            await authService.refresh(req.body.token);

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};
//logout
exports.logout = async (req, res) => {
    try {
        await authService.logout(req.body.token);
        res.json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};