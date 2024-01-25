import React, { useState, useEffect } from 'react';
import { Typography, Card, CardMedia, CardContent, Grid, List, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Tabs, Row, Col, Button as AntButton} from 'antd';
import Axios from 'axios';

// GPT 연동
import OpenAI from 'openai';
const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});


const NewsDetail = () => {
  const { uid } = useParams();
  const [article, setArticle] = useState(null);
  const [clickedWords, setClickedWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordInfo, setWordInfo] = useState(null);

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
    // Check if the word is already in the clickedWords array
    if (!clickedWords.includes(word)) {
      const newClickedWords = [...clickedWords, word];
      setClickedWords(newClickedWords);
  
      // Log the updated clickedWords array to the console
      console.log('Clicked Words:', newClickedWords);
    }
  
    setSelectedWord(word);
    fetchWordInfo(word);
  };
  
  ///////////////////////////////////////////////
  // 여기에 GPT 용어에 대한 해석을 보여주면 될듯??//
  ///////////////////////////////////////////////
  const fetchWordInfo = async (word) => {
    // Placeholder for fetching word information
    // Replace this with your actual logic to fetch word info
    const info = `Information about ${word}`;
    setWordInfo(info);
  };

  const handleButtonClick = async () => {
    console.log('GPT 실행');

    const newsTitle = article.title;
    const newsBodyText = article.body;
    const term = selectedWord;

    // Construct the request payload
    const payload = {
      messages: [
        { 
          role: "system", 
          content: `${newsTitle}\n${newsBodyText}\n\nThe term "${term}" was selected. Can you provide a description of this term in the context of the article above?\nPlease answer in Korean.` 
        }
      ],
      model: "gpt-3.5-turbo",
    };

    // Send the request
    try {
      const completion = await openai.chat.completions.create(payload);
      setWordInfo(completion.choices[0].message.content);
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error with OpenAI:', error);
      setWordInfo("Sorry, there was an error processing your request.");
    }
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

        {selectedWord && (
          <Card sx={{ maxWidth: 300, margin: 'auto', marginTop: 2 }}>
            <CardContent>
            <AntButton onClick={handleButtonClick}>용어 설명</AntButton>
              <Typography variant="h6" gutterBottom>
                Info about "{selectedWord}"
              </Typography>
              <Typography variant="body2">
                {wordInfo}
              </Typography>
            </CardContent>
          </Card>
        )}

      </Grid>
    </Grid>
  );
};

export default NewsDetail;
