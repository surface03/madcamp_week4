// 해결해야할 과제
// 1] 관련된 TAG TOP5 보여주게 하기??
// 2] GPT 연동 마지막에 해야할 듯???

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Grid, Typography, Button, TextField, Box } from '@mui/material';
import { Tabs, Row, Col, Button as AntButton } from "antd";
import ApexCharts from 'apexcharts';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import './MyPage.css';

// GPT 연동
import OpenAI from 'openai';
const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

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

  const getGenderIcon = (gender) => {
    switch (gender.toLowerCase()) {
      case 'male': return <MaleIcon />;
      case 'female': return <FemaleIcon />;
      default: return null;
    }
  };


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
      background: '#ffffff',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
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
  const handleButtonClick = async () => {
    
    // 해결해야할 문제: randomText 설정 어떻게?? 음... json파일 넣어버리고, user 정보 넣어버리고, 중립을 지키기 위해서 나의 성향과 어떤 방향으로 기사를 읽어야 하는지 알려달라하면 되남??? 
    const randomText = '집에 보내줘...'; // 랜덤 텍스트 생성 로직 추가
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: randomText }],
        model: "gpt-3.5-turbo",
      });
    setRandomText(completion.choices[0].message.content);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card className="card-container">
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <div className="info-label">Name:</div>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>{user.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <div className="info-label">ID:</div>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>{user.id}</Typography>
              </Grid>
              <Grid item xs={6}>
                <div className="info-label">Age:</div>
              </Grid>
              <Grid item xs={6}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>{user.name}</Typography>
              </Grid>
              {/* Gender with icon */}
              <Grid item xs={6}>
                <div className="info-label">Gender:</div>
              </Grid>
              <Grid item xs={6}>
                <div className="info-value">{getGenderIcon(user.gender)}</div>
              </Grid>
              {/* Highlighted Political Orientation */}
              <Grid item xs={6}>
                <div className="info-label">Political Orientation:</div>
              </Grid>
              <Grid item xs={6}>
                <Box bgcolor="yellow" p={1} borderRadius={2} className="info-value">
                  {user.politicalOrientation}
                </Box>
              </Grid>
              {/* Add more fields as needed */}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <div ref={chartRef}></div>
      </Grid>
      <Grid item xs={12}>
        <AntButton onClick={handleButtonClick}>나의 성향 분석</AntButton>
        <TextField
          value={randomText}
          fullWidth
          variant="outlined"
          InputProps={{
            style: {
              backgroundColor: 'white',
              borderColor: '#ced4da',
              borderRadius: '4px',
              padding: '10px'
            }
          }}
          style={{ margin: '10px 0' }}
        />
      </Grid>
    </Grid>
  );
};

export default MyPage;