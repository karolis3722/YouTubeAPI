import React from 'react';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { GridColumn, Grid, Header } from 'semantic-ui-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import YoutubeMonitor from "./Pages/YoutubeMonitor";
import Card from "./components/Card";
import SeekComments from './Pages/SeekComments';

const Main = () => {
  const navigate = useNavigate();

  const cardContent = {
    "youtubeMonitor": {
      header: "Monitor YouTube videos",
      description: "Allows to monitor youtube videos by specific keywords in real time",
      image:  "/images/YoutubeMonitor.jpg"
    },
    "seekYoutube": {
      header: "Seek YouTube comments",
      description: "Allows to check last 20 comments of your selected videos",
      image:  "/images/SeekComments.jpg"
    }
  }

  return (
    <div className="grid-container">
      <div className="content">
        <Header as="h2" className="main-title">Select Application</Header>
        <Grid container columns={4}>
          <GridColumn />
          <GridColumn>
            <Card onClick={() => navigate("/monitor")} content={cardContent["youtubeMonitor"]} />
          </GridColumn>
          <GridColumn>
            <Card onClick={() => navigate("/comments")} content={cardContent["seekYoutube"]} />
          </GridColumn>
          <GridColumn />
        </Grid>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/monitor" element={<YoutubeMonitor />} />
        <Route path="/comments" element={<SeekComments />} />
      </Routes>
    </Router>
  );
}