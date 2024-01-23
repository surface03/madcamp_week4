import React, { useState, useEffect } from 'react';
import { Typography, Card, CardMedia, CardContent, Grid, List, ListItem } from '@mui/material';
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import { Tabs, Row, Col, Button } from 'antd';

const NewsDetail = ({ match }) => {
  const { uid } = useParams(); // Get the uid parameter
  const [article, setArticle] = useState(null);
  const [clickedWords, setClickedWords] = useState([]);

  useEffect(() => {
    // uid를 이용해서 Article을 받아오는 과정, 수정필요
    /*
    const fetchArticle = async () => {
      const response = await fetch(`/api/articles/${uid}`);
      const data = await response.json();
      setArticle(data);
    };

    fetchArticle();
    */
   setArticle({
    picture: "https://us.123rf.com/450wm/aquir/aquir1906/aquir190606651/125693673-%EC%98%88%EC%8B%9C-%EC%8A%A4%ED%83%AC%ED%94%84-%EC%98%88-%EC%82%AC%EA%B0%81%ED%98%95-%EA%B7%B8%EB%9F%B0-%EC%A7%80-%EA%B8%B0%ED%98%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%98%88%EC%8B%9C.jpg",
    title: "HIHIHIHIHIHIHIHIH",
    date: "2023-11-11",
    body: "sdnkjfsdfhiousfihdwegfys  797 98 n87 n wfhu ifus df ush ushodf \n dg sdfuis hsofd \nsdf",
   });
  }, [uid]);

  const handleWordClick = (word) => {
    setClickedWords([...clickedWords, word]);
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
