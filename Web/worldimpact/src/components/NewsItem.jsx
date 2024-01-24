import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Tabs, Row, Col, Button } from 'antd';
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
        // Handle errors (e.g., show a notification)
      }
    };
    fetchTags();
  }, [newsItem.uid]);


  const handleContextMenu = (event) => {
    event.preventDefault();
    contextMenu.show({
      id: newsItem.uid,
      event: event,
      props: {
        newsItem: newsItem,
      },
    });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <Link to={`/news/${newsItem.uid}`}>
        <img
          src={newsItem.thumbnail}
          alt={newsItem.title_text}
          style={{ width: '70%' }}
        />
        <h3>{newsItem.title_text}</h3>
        <p>{newsItem.article_date}</p>
      </Link>

      <Menu id={newsItem.uid}>
        {/* newsItem.tags.map으로 수정, newsItem에는 tags가 있어야 된다. 위의 tags_example 형식*/}
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
