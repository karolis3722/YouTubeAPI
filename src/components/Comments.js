import React, { useState } from 'react';
import { 
    Card, 
    Icon,
    Image, 
    Button, 
    CommentGroup, 
    Comment, 
    CommentAvatar, 
    CommentContent, 
    CommentAuthor, 
    CommentMetadata, 
    CommentText, 
    Label 
} from 'semantic-ui-react';

const CommentList = ({ comments }) => {
  const [expandedVideos, setExpandedVideos] = useState({});

  const toggleExpand = (videoId) => {
    setExpandedVideos(prev => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  return (
    <div>
      {comments.map((videoData, index) => {
        const videoId = Object.keys(videoData)[0];
        const comments = videoData[videoId];

        return (
          <Card fluid key={index}>
            <Image
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Comments for {videoId}</Card.Header>
              <Card.Meta>
                <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
                  <Icon name="youtube" /> Watch on YouTube
                </a>
              </Card.Meta>
            </Card.Content>
            <Card.Content>
              <CommentGroup>
                {comments.slice(0, expandedVideos[videoId] ? 20 : 3).map((comment, index) => (
                  <Comment key={index} >
                    <CommentAvatar src={comment.authorAvatar} />
                    <CommentContent >
                      <CommentAuthor style={{textAlign: 'left'}}>{comment.author}</CommentAuthor>
                      <CommentMetadata style={{display: 'flex'}}>{new Date(comment.publishedAt).toLocaleString()}</CommentMetadata>
                      <CommentText style={{textAlign: 'left'}} dangerouslySetInnerHTML={{ __html: comment.comment }} />
                    </CommentContent>
                    {comment.fromDatabase ? <Label as='a'color='red' style={{display: 'flex', width:'150px'}} tag>Taken from database</Label> : ''}
                  </Comment>
                ))}
              </CommentGroup>
              {comments.length > 3 && (
                <Button onClick={() => toggleExpand(videoId)}>
                  {expandedVideos[videoId] ? "Show Less" : "Show More"}
                </Button>
              )}
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
};

export default CommentList;
