const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id: { type: String, required: true },
    author: { type: String, required: true },
    authorAvatar: { type: String, required: true },
    comment: { type: String, required: true },
    publishedAt: { type: Date, required: true },
});

const videoCommentsSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true },
    comments: [commentSchema],
}, { timestamps: true });

const VideoComments = mongoose.model('VideoComments', videoCommentsSchema);

module.exports = VideoComments;
