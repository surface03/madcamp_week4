import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";
import './TopicTabs.css';

const TopicTabs = ({
  mainTopics,
  style = {}
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (key) => {
    console.log("Tab bar: ", key);
    navigate(`/tab/${key}`);
  };

  const getActiveKey = () => {
    const path = location.pathname;
    if (path === '/tab/all') return 'all';
    if (path === '/tab/1') return '1';
    if (path === '/tab/2') return '2';
    if (path === '/tab/3') return '3';
    if (path === '/tab/4') return '4';
    if (path === '/tab/5') return '5';
    if (path === '/tab/6') return '6';
    if (path === '/tab/7') return '7';
    if (path === '/tab/8') return '8';
    return null;
  };

  return (
    <Tabs
      activeKey={getActiveKey()}
      onChange={handleTabChange}
      items={[
        {
          label: "전체",
          key: "all",
          // Add content or other properties if needed
        },
        ...mainTopics.map((topic) => ({
          label: topic.name,
          key: topic.id,
          // Add content or other properties if needed
        })),
      ]}
      style={style}
      className="custom-tabs"
    />
  );
};

export default TopicTabs;
