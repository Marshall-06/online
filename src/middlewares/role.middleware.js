const { hasRole } = require("../utils/role.util");

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !hasRole(req.user.role, allowedRoles)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};