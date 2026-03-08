exports.instructorResponseDTO = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone_num: user.phone_num,
    avatar_img: user.avatar_img || null,
    role: user.role
  };
};