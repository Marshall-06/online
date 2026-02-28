exports.videoResponseDTO = (video) => {
  return {
    id: video.id,
    title: video.title,
    duration: video.duration
  };
};