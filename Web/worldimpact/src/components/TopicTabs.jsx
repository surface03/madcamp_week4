import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";

const TopicTabs = ({
  mainTopics,
  currentMainTopic,
  setCurrentMainTopic,
  onTabChange,
}) => {
  const handleTabChange = (key) => {
    setCurrentMainTopic(key);
    if (onTabChange) {
      onTabChange(key);
    }
    console.log("Tab bar: ", key);
  };

  return (
    <Tabs
      activeKey={currentMainTopic}
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
    />
  );
};

export default TopicTabs;
