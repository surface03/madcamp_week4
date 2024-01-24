// 해결해야할 과제
// 1] 관련된 TAG TOP5 보여주게 하기??
// 2] GPT 연동 마지막에 해야할 듯???

import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Button, TextField } from '@mui/material';
import { Tabs, Row, Col, Button as AntButton } from "antd";
import ApexCharts from 'apexcharts';

// GPT 연동
//import OpenAI from 'openai';
//const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

const MyPage = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    politicalOrientation: ''
  });
  const [randomText, setRandomText] = useState('');
  const [tagLogs, setTagLogs] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref for the chart instance


  // Function to fetch user data from the server
  const fetchUserData = async () => {
    try {
        // Retrieve user ID from sessionStorage
        const userId = sessionStorage.getItem('user');
        // If there's no user ID in sessionStorage, you might want to handle this case
        if (!userId) {
          console.error('No user ID found in sessionStorage');
        return;
      } else {
        console.log("userid", userId)
      }

      const response = await fetch(`http://localhost:3000/user/userInfo?id=${userId}`);
      const userData = await response.json();
      if (response.status === 200) {
        setUser({
          id: userData.id,
          name: userData.name,
          age: userData.age,
          gender: userData.gender,
          politicalOrientation: userData.politicalOrientation
        });
      } else {
        console.error('Error fetching user data:', userData.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  // User Tag Log 정보 가져오기
  const fetchTagLogs = async () => {
    try {
      const userId = sessionStorage.getItem('user');
      if (!userId) {
        console.error('No user ID found in sessionStorage');
        return;
      }

      const response = await fetch(`http://localhost:3000/user/taglog?user_id=${userId}`);
      const data = await response.json();
      if (response.status === 200) {
        setTagLogs(data);
      } else {
        console.error('Error fetching tag logs:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchTagLogs();

  // Initialize chart
  chartInstance.current = new ApexCharts(chartRef.current, {
    chart: {
      type: 'bar',
    },
    series: [{
      name: 'Tag Count',
      data: []
    }],
    xaxis: {
      categories: []
    }
  });
  chartInstance.current.render();

  return () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  };
  }, []);

  useEffect(() => {
    if (tagLogs.length > 0) {
      // Sort tagLogs by count in descending order and take the top 5
      const sortedTagLogs = [...tagLogs].sort((a, b) => b.count - a.count).slice(0, 10);
  
      const categories = sortedTagLogs.map(log => log.tag);
      const data = sortedTagLogs.map(log => log.count);
  
      chartInstance.current.updateOptions({
        series: [{
          name: 'Tag Count',
          data: data
        }],
        xaxis: {
          categories: categories
        }
      });
    }
  }, [tagLogs]);

  // ChatGPT 연동
  // const [gptResponse, setGptResponse] = useState('');
  const handleButtonClick = async () => {
    
    // 해결해야할 문제: randomText 설정 어떻게?? 음... json파일 넣어버리고, user 정보 넣어버리고, 중립을 지키기 위해서 나의 성향과 어떤 방향으로 기사를 읽어야 하는지 알려달라하면 되남??? 
    const randomText = ''; // 랜덤 텍스트 생성 로직 추가
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: randomText }],
        model: "gpt-3.5-turbo",
      });
    setGptResponse(completion.choices[0].message.content);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6">ID: {user.id}</Typography>
        <Typography>Name: {user.name}</Typography>
        <Typography>Age: {user.age}</Typography>
        <Typography>Gender: {user.gender}</Typography>
        <Typography>PoliticalOrientation: {user.politicalOrientation}</Typography>
      </Grid>
      <Grid item xs={6}>
        <div ref={chartRef}></div>
      </Grid>
      <Grid item xs={12}>
        <AntButton onClick={handleButtonClick}>Generate Random Text</AntButton>
        <TextField value={randomText} fullWidth />
      </Grid>
    </Grid>
  );
};

export default MyPage;