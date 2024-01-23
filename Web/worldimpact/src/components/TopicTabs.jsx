import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";

const TopicTabs = ({ mainTopics, currentMainTopic, setCurrentMainTopic }) => {
  return (
    <Tabs activeKey={currentMainTopic} onChange={setCurrentMainTopic}>
      <Tabs.TabPane tab="전체" key="all" />
      {mainTopics.map((topic) => (
        <Tabs.TabPane tab={topic.name} key={topic.id} />
      ))}
    </Tabs>
  );
};

export default TopicTabs;