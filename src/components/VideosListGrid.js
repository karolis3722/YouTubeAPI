import { useState, useEffect } from "react";
import { Grid, Card, Icon, Image, Header } from 'semantic-ui-react';

const VideosListGrid = ({ videos }) => {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Header as="h3">Note - list will be updated in: {countdown}</Header>
      <Grid stackable columns={3}>
        {videos.map((video, index) => (
          <Grid.Column key={index}>
            <Card>
              <Image
                src={`https://img.youtube.com/vi/${video.url.split('v=')[1]}/hqdefault.jpg`}
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{video.title}</Card.Header>
                <Card.Meta>
                  <span className='date'>{new Date(video.publishedAt).toLocaleDateString()}</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <Icon name='youtube' /> Watch on YouTube
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
    </Grid>
  </div>
  )
}


export default VideosListGrid;