
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  NavLink,
  Routes,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";
import { AppBar, Toolbar, IconButton, Tab, Box } from "@mui/material";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TopSubTopics from "./components/TopSubTopics";
import SubTopicNews from "./components/SubTopicNews";
import HeaderAppBar from "./components/HeaderAppBar";
import NewsDetail from "./components/NewsDetail";
import TopicTabs from "./components/TopicTabs";
import NewsGrid from "./components/NewsGrid";
import MyPage from "./components/MyPage";
import MainPage from "./components/MainPage";
import KeywordList from "./components/KeyWordList";
import {
  exampleMainTopics,
  exampleSubTopics,
  fetchNewsByLargeTag,
} from "./ExampleData";

import Logo from "./images/sample_logo.png";
import { useNavigate } from "react-router-dom";
import BackGround from "./images/background.png"

import "./App.css";

const LayoutWithJustBar = () => {
  const navigate = useNavigate();
  const gradientStyle = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    width: '1234px'
  };

  const handleLogoutClick = () => {
    // Implement logout logic here
    sessionStorage.removeItem('user');
    navigate("/");
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <Link to="/">
          <img src={Logo} alt="Logo" style={{ cursor: "pointer" }} />
        </Link>
      </div>
      <AppBar position="static" style={gradientStyle}>
        <Toolbar>
          <Button
            type="primary"
            style={{ marginLeft: "auto" }}
            onClick={handleLogoutClick} // Attach the function to the Logout button
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '64px' }}></div>
      <Outlet />
    </>
  );
};

const LayoutWithHeader = () => {
  //const [filteredNews, setfilteredNews] = useState([]);
  const [mainTopics, setMainTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]);

  useEffect(() => {
    setMainTopics(exampleMainTopics);
    setSubTopics(exampleSubTopics);
  }, []);


  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" flexDirection="column" flex={1}>
        <HeaderAppBar mainTopics={mainTopics} />
        <Outlet />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <KeywordList subTopics={subTopics} />
      </Box>
    </Box>
  );
};

const App = () => {
  const style = {
    backgroundImage: 'url(./images/background.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithHeader />}>
          <Route index element={<MainPage />} />
          <Route path="tab/:tabkey" element={<NewsGrid />} />
          <Route path="subtopics/:tagUid" element={<SubTopicNews />} />
        </Route>

        <Route path="/" element={<LayoutWithJustBar />}>    
          <Route path="news/:uid" element={<NewsDetail />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

