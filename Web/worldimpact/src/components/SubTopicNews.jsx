import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";

const SubTopicNews = ({ match }) => {
  const subTopicId = match.params.subTopicId;
  // 해당 소주제의 뉴스 필터링
  const subTopicNews = exampleNews.filter((news) =>
    news.subTopics.includes(subTopicId)
  );

  return (
    <div>
      {subTopicNews.map((newsItem) => (
        <div key={newsItem.id}>
          <Link to={`/news/${newsItem.id}`}>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.date}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SubTopicNews;