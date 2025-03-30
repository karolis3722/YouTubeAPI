const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/commentThreads";
const COMMENT_COUNT = 20;

async function fetchComments(videoIds) {
    let allComments = [];

    for (const videoId of videoIds) {
        let nextPageToken = '';
        let comments = [];

        try {
            const response = await axios.get(YOUTUBE_URL, {
                params: {
                    part: 'snippet',
                    videoId: videoId,
                    maxResults: COMMENT_COUNT,
                    order: 'time', 
                    key: API_KEY,
                    pageToken: nextPageToken,
                },
            });
            // console.log(response.data.items[0].snippet);

            while (comments.length < COMMENT_COUNT && response.data.nextPageToken) {
                nextPageToken = response.data.nextPageToken;
                const nextPageResponse = await axios.get(YOUTUBE_URL, {
                    params: {
                        part: 'snippet',
                        videoId: videoId,
                        maxResults: COMMENT_COUNT,
                        order: 'time',
                        key: API_KEY,
                        pageToken: nextPageToken,
                    },
                });

                const nextPageComments = nextPageResponse.data.items.map(item => ({
                    id: item.snippet.topLevelComment.id,
                    author: item.snippet.topLevelComment.snippet.authorDisplayName,
                    authorAvatar: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
                    comment: item.snippet.topLevelComment.snippet.textDisplay,
                    publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
                }));

                comments.push(...nextPageComments);
            }

            comments = comments.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
            comments = comments.slice(0, COMMENT_COUNT);

            allComments.push({ [videoId]: comments });
        } catch (error) {
            console.error(`Error fetching comments for video ${videoId}:`, error);
            allComments.push({ [videoId]: [] });
        }
    }

    return allComments;
}

module.exports = fetchComments;