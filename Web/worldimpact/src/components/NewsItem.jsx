import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";

const NewsItem = ({ newsItem }) => {
  return (
    <div>
      <Link to={`/news/${newsItem.id}`}>
        <img
          src={newsItem.thumbnail}
          alt={newsItem.title_text}
          style={{ width: "70%" }}
        />
        <h3>{newsItem.title_text}</h3>
        <p>{newsItem.article_date}</p>
      </Link>
    </div>
  );
};

export default NewsItem;