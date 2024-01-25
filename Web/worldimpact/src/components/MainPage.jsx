import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';

function MainPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // top 10 news 데이터 받아오기, news에 저장
  }, []);

  if (news.length < 1) {
    return (
      <div>
        <h1>Top 10 Hot News</h1>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div>
      <h1>Top 10 Hot News</h1>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {news.map((item) => (
          <ListItem key={item.uid} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="News Thumbnail" src={item.thumbnail} />
            </ListItemAvatar>
            <ListItemText
              primary={<Link to={`/news/${item.uid}`}>{item.title_text}</Link>}
              secondary={new Date(item.article_date).toLocaleDateString()}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MainPage;
