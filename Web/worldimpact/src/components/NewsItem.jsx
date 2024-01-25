import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Tabs, Row, Col, Button, Card } from 'antd';
const { Meta } = Card;
import './NewsItem.css';
import { Menu, Item, contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

import axios from 'axios';

const NewsItem = ({ newsItem }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/news/getAllTagsOfArticle?uid=${newsItem.uid}`);
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, [newsItem.uid]);

  const handleContextMenu = (event) => {
    event.preventDefault();
    contextMenu.show({
      id: `tags-menu-${newsItem.uid}`, // Dynamic ID based on newsItem.uid
      event: event,
      props: {
        newsItem: newsItem
      }
    });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <Card
        hoverable
        style={{ width: 230, margin: '20px' }}
        cover={
          <img
            alt={newsItem.title_text}
            src={newsItem.thumbnail}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        }
      >
        <Meta
          title={<Link to={`/news/${newsItem.uid}`}>{newsItem.title_text}</Link>}
          description={newsItem.article_date}
        />
      </Card>

      {/* Dynamic Menu ID */}
      <Menu id={`tags-menu-${newsItem.uid}`}>
        {tags.map((tag) => (
          <Item key={tag.id}>
            <Link to={`/subtopics/${tag.id}`}>{tag.tag}</Link>
          </Item>
        ))}
      </Menu>
    </div>
  );
};

export default NewsItem;