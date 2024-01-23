import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Row, Col, Button as AntButton } from "antd";
import { Grid, Typography, Button, TextField } from '@mui/material';
import ApexCharts from 'apexcharts';
// https://apexcharts.com/docs/installation/
//import ReactApexChart from 'react-apexcharts';

const MyPage = () => {
    const [randomText, setRandomText] = useState('');
    const chartRef = useRef(null);
    const user = {
      id: 'UserID',
      name: 'UserName',
      age: 30,
      gender: 'Gender',
      politicalOrientation: 'Orientation'
    };
  
    useEffect(() => {
      const chart = new ApexCharts(chartRef.current, {
        chart: {
          type: 'bar',
          // other chart configurations
        },
        series: [{
          name: 'Series 1',
          data: [20, 40, 60, 80] // example data
        }],
        // include other necessary chart options
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
          <Typography variant="h6">{user.id}</Typography>
          <Typography>{user.name}</Typography>
          <Typography>{user.age}</Typography>
          <Typography>{user.gender}</Typography>
          <Typography>{user.politicalOrientation}</Typography>
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