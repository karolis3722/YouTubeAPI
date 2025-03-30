const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const searchYouTube = require("./routes/youtubeMonitor");
const fetchComments = require("./routes/getComments");
const saveVideoComments = require("./functions/storeComments");
const VideoComments = require("./models/comment");
const isExpired = require("./functions/isExpired");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/tasksDB");

app.get("/api/youtubeMonitor/:keywords", async (req, res) => {
  const keywords = req.params.keywords;
  try {
    console.log("trying...");
    const videos = await searchYouTube(keywords);
    console.log("videos",videos);
    res.status(200).json(videos);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch youtube API" });
  }
});
app.get("/api/comments/:videoIds", async (req, res) => {
  const videoIds = req.params.videoIds.split(",");
  console.log("Fetching comments for video IDs:", videoIds);

  try {
      const videosFromDb = await VideoComments.find({ videoId: { $in: videoIds } });

      let finalResponse = [];
      let videosToFetch = [];

      videoIds.forEach((videoId) => {
          const video = videosFromDb.find(v => v.videoId === videoId);

          if (video && video.comments.length > 0) {

              if (!isExpired(video.updatedAt)) {
                  finalResponse.push({
                      [videoId]: video.comments.map(({ id, author, authorAvatar, comment, publishedAt }) => ({
                          id,
                          author,
                          authorAvatar,
                          comment,
                          publishedAt,
                          fromDatabase: true,
                      }))
                  });
                  return;
              }
          }
          
          videosToFetch.push(videoId);
      });

      if (videosToFetch.length > 0) {
          console.log("Fetching new comments for:", videosToFetch);
          const videosFromApi = await fetchComments(videosToFetch);

          for (const video of videosFromApi) {
              const videoID = Object.keys(video)[0];

              if (videoID) {
                  await saveVideoComments(videoID, video[videoID]);

                  finalResponse.push({
                      [videoID]: video[videoID].map(({ id, author, authorAvatar, comment, publishedAt }) => ({
                          id,
                          author,
                          authorAvatar,
                          comment,
                          publishedAt,
                          fromDatabase: false,
                      }))
                  });
              }
          }
      }

      res.status(200).json(finalResponse);
  } catch (error) {
      console.error("Error fetching video comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
  }
});


app.listen(9000, () => console.log("Server running on port 9000"));
