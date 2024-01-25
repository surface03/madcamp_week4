import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // or your preferred method for navigation
import axios from "axios";
import './KeyWordList.css'

const fetchSubTopic = async () => {
    try {
      const response = await axios.get('http://localhost:3000/news/mostStatedTag');
      return response.data.map(item => ({
        id: String(item.id), // Assuming you want to generate an id
        name: item.tag
      }));
    } catch (error) {
      console.error('Error fetching subTopic lists:', error);
      return [];
    }
  };

function KeywordList() {

    const [subTopics, setSubTopics] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchSubTopic();
        setSubTopics(data);
      };
      fetchData();
    }, []);

    return (
      <>
      <div className="keyword-list-bar">
          <Typography variant="h5" className="keyword-list-header">
              Top 10
          </Typography>
          <List className="keyword-list">
              {subTopics.slice(0, 10).map((subTopic) => (
                  <ListItem button key={subTopic.id} component={Link} to={`/subtopics/${subTopic.id}`}>
                      <ListItemText primary={subTopic.name} className="center-aligned-text" />
                  </ListItem>
              ))}
          </List>
      </div>
      </>
  );

  

  {/* return (
    <div>
      <h2>Top 10 소주제</h2>
      {subTopics.slice(0, 10).map((subTopic) => (
        <Button key={subTopic.id}>
          <Link to={{ 
              pathname: `/subtopics/${subTopic.id}`, 
              state: { subTopicName: subTopic.name}
          }}>
              {subTopic.name}
          </Link>
        </Button>
      ))}
    </div>
  ); */}
}

export default KeywordList;