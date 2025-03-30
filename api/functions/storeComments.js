const VideoComments = require("../models/comment");

async function saveVideoComments(videoId, comments) {
    try {
        let video = await VideoComments.findOne({ videoId });
        if (!video) {
            video = new VideoComments({ videoId, comments });
        } else {
            const newComments = comments.filter(
                newComment => !video.comments.some(existingComment => existingComment.id === newComment.id)
            );
            if (newComments.length > 0) {
                video.comments.push(...newComments);
            } else {
                console.log(`No new comments to add for video ${videoId}`);
                return;
            }
        }
        await video.save();
        console.log(`Comments for video ${videoId} saved successfully!`);
    } catch (error) {
        console.error(`Error saving comments for video ${videoId}:`, error);
    }
}

module.exports = saveVideoComments;
