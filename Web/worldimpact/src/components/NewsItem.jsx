import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Tabs, Row, Col, Button } from 'antd';
import { Menu, Item, contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const NewsItem = ({ newsItem }) => {
  const tags_example = [
    {
      uid: "1",
      name: "HELLO WORLD!"
    },
    {
      uid: "2",
      name: "HELL WORLD!"
    }
  ];

  const handleContextMenu = (event) => {
    event.preventDefault();
    contextMenu.show({
      id: 'tags-menu',
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

      <Menu id="tags-menu">
        {/* newsItem.tags.map으로 수정, newsItem에는 tags가 있어야 된다. 위의 tags_example 형식*/}
        {tags_example.map((tag) => (
          <Item key={tag.uid}>
            <Link to={`/subtopics/${tag.uid}`}>{tag.name}</Link>
          </Item>
        ))}
      </Menu>
    </div>
  );
};

export default NewsItem;
