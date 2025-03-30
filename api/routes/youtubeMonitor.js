const axios = require('axios');
const API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";
const INTERVAL = 60000;
const AMOUNT = 9;
let latestVideos = [];

async function searchYouTube(keywords) {
    try {
        const response = await axios.get(YOUTUBE_URL, {
            params: {
                part: "snippet",
                q: keywords,
                type: "video",
                order: "date",
                maxResults: AMOUNT,
                key: API_KEY,
            },
        });
        latestVideos = response.data.items.map(item => ({
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            publishedAt: item.snippet.publishedAt,
        }));

        return latestVideos;
    } catch (error) {
        console.error("Error fetching data from YouTube API", error);
        return [];
    }
}

// THIS WOULD BE FOR A CONSTANT CHECKING
// async function monitorYouTube(keywords) {
//         console.log("Starting YouTube monitoring...");
//         setInterval(async () => {
//             console.log("Checking for new videos...");
//             await searchYouTube(keywords);
//         }, INTERVAL);
// }
//monitorYouTube(keywords);


module.exports = searchYouTube;