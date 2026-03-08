const jwt = require("jsonwebtoken");

exports.generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "24h" }
  );
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d" }
  );
};

exports.verifyAccessToken = (token) => {   
  return jwt.verify(token, process.env.JWT_ACCESS_KEY);
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_KEY);
};