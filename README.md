# YouTube API

This is a project to learn YouTube API.

## Start Environments
- Run `npm install` to install the required packages.
- For the front-end, run `npm start`.
- For the back-end, navigate to the `api` folder and run `node server.js`.

## Usage
![image](https://github.com/user-attachments/assets/c83261f7-d722-4c76-8fde-bfb1a84cc0d1)<br />
Two applications stored here: <br />
- Monitor YouTube videos. <br />
- Seek YouTube comments. <br />

# Aplications
## Monitor YouTube videos
![image](https://github.com/user-attachments/assets/627c2d44-b7d2-4841-bcb7-7736d9b189df) <br />
- Monitors newly uploaded youtube videos based on user provided keywords. List is being refreshed every 60 seconds.

## Seek YouTube comments
![image](https://github.com/user-attachments/assets/9a1875b0-a954-4289-b419-baafc0a9a265)
- Searches for one or multiple YouTube videos by provided ID's.
- Displays up to 20 newest comments of the video and stores them to database.
- If the same video ID is provided within 24 hours, only the data from database is being displayed.
