import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from '@mui/material';
import NewsItem from './NewsItem';

import axios from '../../node_modules/axios/index';

function MainPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // top 10 news 데이터 받아오기, news에 저장
    const loadTopNews = async() => {
      try{
        const response = await axios.get('http://localhost:3000/news/mostStatedArticle');
        const articles = response.data;
        setNews(articles);
      } catch (error){
        console.error('Error fetching Top News', error);
      }
    };
    loadTopNews();
  }, []);

  function getOrdinalSuffix(i) {
    const j = i % 10,
          k = i % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  }

  if (news.length < 1) {
    return (
      <div>
        <h1>Top 12 Hot News</h1>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',        // Enables flexbox
      flexDirection: 'column', // Stack items vertically
      justifyContent: 'center', // Center items vertically
      alignItems: 'center',     // Center items horizontally
      textAlign: 'center',      // Center text
    }}>
      <h1>Top 12 Hot News</h1>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {news.map((item, index) => (
          <ListItem key={item.uid} alignItems="flex-start" divider>
            <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
              {`${index + 1}${getOrdinalSuffix(index + 1)}`} {/* Ranking */}
            </Typography>
            <NewsItem newsItem = {item}/>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MainPage;
