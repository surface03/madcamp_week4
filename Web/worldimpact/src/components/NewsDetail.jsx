import React, { useState, useEffect } from 'react';
import { Typography, Card, CardMedia, CardContent, Grid, List, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';

import Axios from 'axios';

const NewsDetail = () => {
  const { uid } = useParams(); // Get the uid parameter
  const [article, setArticle] = useState(null);
  const [clickedWords, setClickedWords] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/news/getAnArticle?uid=${uid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticle({
          picture: data.thumbnail, 
          title: data.title_text,
          date: data.article_date,
          body: data.body_text,
        });
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
    const logClick = async () => {
      try {
        const userId = sessionStorage.getItem('user');
        if (!userId) {
          console.error('No user ID found in sessionStorage');
          return;
        }

        const response = await Axios.post('http://localhost:3000/user/logclick', {
          user_id: userId,
          article_uid: uid
        });
    
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error sending log click request:', error);
      }
    }
    logClick();
  }, [uid]);

  const handleWordClick = (word) => {
    const newClickedWords = [...clickedWords, word];
    setClickedWords(newClickedWords);
  
    // Log the updated clickedWords array to the console
    console.log('Clicked Words:', newClickedWords);
  };
  
  const renderBody = (body) => {
    return body.split(' ').map((word, index) => (
      <span key={index} onClick={() => handleWordClick(word)} style={{ cursor: 'pointer', marginRight: '5px' }}>
        {word}
      </span>
    ));
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card sx={{ maxWidth: 600, margin: 'auto' }}>
          <CardContent>
            <Typography variant="h3" gutterBottom align="center">
              {article.title}
            </Typography>
            <Typography variant="subtitle2" gutterBottom align="center" color="textSecondary">
              {new Date(article.date).toLocaleDateString()}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="300"
            image={article.picture}
            alt={article.title}
          />
          <CardContent>
            <Typography variant="body1">
              {renderBody(article.body)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ maxWidth: 300, margin: 'auto' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Clicked Words
            </Typography>
            <List>
              {clickedWords.map((word, index) => (
                <ListItem key={index}>{word}</ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NewsDetail;
