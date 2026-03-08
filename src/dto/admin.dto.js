exports.adminResponseDTO = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar_img: user.avatar_img || null,
    created_at: user.createdAt
  };
};