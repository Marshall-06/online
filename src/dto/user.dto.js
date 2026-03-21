const userResponseDTO = (user) => {
    if (!user) return null;

    return {
        id: user.id,
        name: user.name || null,
        username: user.username || null,
        phone_num: user.phone_num,
        email: user.email,
        role: user.role,
        avatar_img: user.avatar_img || null
    };
};


module.exports = userResponseDTO;