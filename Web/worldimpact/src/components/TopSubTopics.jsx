import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";

const TopSubTopics = ({ subTopics }) => {
  return (
    <div>
      <h2>Top 10 소주제</h2>
      {subTopics.slice(0, 10).map((subTopic) => (
        <Button key={subTopic.id}>
          <Link to={`/subtopics/${subTopic.id}`}>{subTopic.name}</Link>
        </Button>
      ))}
    </div>
  );
};

export default TopSubTopics;