import React, { useState, useEffect } from 'react';
import VideosListGrid from '../components/VideosListGrid';
import { Container, Header,
         Form, FormGroup, FormField,
         Button, Divider } from 'semantic-ui-react';

const YoutubeMonitor = () => {
  const [videos, setVideos] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [monitoring, setMonitoring] = useState(false);

  const INTERVAL = 60000;

  const fetchVideos = async(keywords) => {
      try {
        console.log("searchText",keywords);
        const response = await fetch(`http://localhost:9000/youtubeMonitor/${keywords}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
  }

  useEffect(() => {
    if (!monitoring) return;
    fetchVideos(keywords);

    const intervalId = setInterval(() => {
      fetchVideos(keywords);
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, [monitoring]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keywords.trim()) return;
    setMonitoring(true);
  };


  return (
    <div style={{ padding: '20px' }}>
      <Container>
        <Header as='h1' textAlign='center' style={{ marginBottom: '40px' }}>
          Monitor YouTube videos
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <FormGroup widths='equal'>
            <FormField
              label='Search keywords'
              control='input'
              placeholder='Search'
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </FormGroup>
          <Button type='submit'>Submit</Button>
          <Divider hidden />
        </Form>
        {videos.length > 0 && <VideosListGrid videos={videos} />}
      </Container>
    </div>
  );
}

export default YoutubeMonitor;
