exports.videoDetailDTO = (video) => {
    return {
        id: video.id,
        title: video.title,
        description: video.description,
        duration: video.duration,
        resolutions: {
            "360p": video.video_360p,
            "480p": video.video_480p,
            "720p": video.video_720p,
            "1080p": video.video_1080p
        }
    };
};