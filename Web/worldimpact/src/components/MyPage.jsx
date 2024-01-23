import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Button, TextField } from '@mui/material';
import { Tabs, Row, Col, Button as AntButton } from "antd";
import ApexCharts from 'apexcharts';

const MyPage = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    politicalOrientation: ''
  });
  const [randomText, setRandomText] = useState('');
  const chartRef = useRef(null);

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

  useEffect(() => {
    fetchUserData();

    const chart = new ApexCharts(chartRef.current, {
      chart: {
        type: 'bar',
        // other chart configurations
      },
      series: [{
        name: 'Series 1',
        data: [20, 40, 60, 80] // example data
      }],
     xaxis: {
      categories: [1991,1992,1993,1994]
      }
    });

    chart.render();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const handleButtonClick = () => {
    setRandomText('Random text here');
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