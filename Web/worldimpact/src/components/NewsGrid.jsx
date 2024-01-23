import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";
import NewsItem from "./NewsItem";

const NewsGrid = ({ news }) => {
  return (
    <Row gutter={16}>
      {news.map((newsItem) => (
        <Col span={6} key={newsItem.id}>
          <NewsItem newsItem={newsItem} />
        </Col>
      ))}
    </Row>
  );
};

export default NewsGrid;