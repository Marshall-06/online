exports.courseResponseDTO = (course) => {
    return {
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        sale_price: course.sale_price || null,
        level: course.level,
        thumbnail: course.thumbnail || null,
        total_videos: course.Videos ? course.Videos.length : 0,
        instructor: course.instructor
            ? {
                id: course.instructor.id,
                name: course.instructor.name
            }
            : null 
    };
};