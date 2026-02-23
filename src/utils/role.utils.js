exports.hasRole = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};