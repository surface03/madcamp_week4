import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";

const fetchSubTopic = async () => {
  try {
    const response = await axios.get('http://localhost:3000/news/mostStatedTag');
    return response.data.map((item, index) => ({
      id: String(index + 1), // Assuming you want to generate an id
      name: item.tag
    }));
  } catch (error) {
    console.error('Error fetching subTopic lists:', error);
    return [];
  }
};

const TopSubTopics = () => {
  const [subTopics, setSubTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSubTopic();
      setSubTopics(data);
    };
    fetchData();
  }, []);

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
