import React, { useState, useEffect } from 'react';
import Comments from "../components/Comments";
import { Container, Header, Form, FormGroup, FormField, Button, Divider, List } from 'semantic-ui-react';

const SeekComments = () => {
  const [comments, setComments] = useState([]);
  const [videoIds, setVideoIds] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState("");

  const addVideoId = () => {
    if (currentVideoId.trim() && !videoIds.includes(currentVideoId)) {
      setVideoIds([...videoIds, currentVideoId]);
      setCurrentVideoId("");
    }
  };

  const fetchComments = () => {
    if (videoIds.length === 0) return;
    fetch(`http://localhost:9000/api/comments/${videoIds.join(",")}`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));

  };

  useEffect(() => {
    if (comments.length > 0) {
      console.log("Updated comments:", comments);
    }
  }, [comments]);

  return (
    <div style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center' }}>
      <Container text>
        <Header as='h1' textAlign="center" style={{ marginBottom: '40px' }}>
          Check YouTube video comments
        </Header>
        <Form size="large" onSubmit={(e) => { e.preventDefault(); fetchComments(); }}>
          <FormGroup widths='equal' style={{ display: 'flex', alignItems: 'center' }}>
            <FormField
              label='Type YouTube video ID:'
              control='input'
              placeholder='Enter Video ID'
              value={currentVideoId}
              onChange={(e) => setCurrentVideoId(e.target.value)}
              style={{ flexGrow: 1 }}
            />
            <Button type='button' onClick={addVideoId} style={{ marginTop: '24px' }}>Add Video</Button>
          </FormGroup>
          <List>
            {videoIds.length > 0 && <Header as='h5'>Added video ids:</Header>}
            {videoIds.map((id, index) => (
              <List.Item key={index}>{id}</List.Item>
            ))}
          </List>
          <Button type='submit' color='red'>Get Comments</Button>
          <Divider />
        </Form>
        
        {comments.length > 0 && <Comments comments={comments} />}
      </Container>
    </div>
  );
}

export default SeekComments;
