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
import { AppBar, Toolbar, IconButton, Tab } from "@mui/material";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TopSubTopics from "./components/TopSubTopics";
import SubTopicNews from "./components/SubTopicNews";
import HeaderAppBar from "./components/HeaderAppBar";
import NewsDetail from "./components/NewsDetail";
import TopicTabs from "./components/TopicTabs";
import NewsGrid from "./components/NewsGrid";
import MyPage from "./components/MyPage";
import {
  exampleMainTopics,
  exampleSubTopics,
  exampleNews,
  fetchNewsByLargeTag,
} from "./ExampleData";

import Logo from "./images/sample_logo.png";
import { useNavigate } from "react-router-dom";

import "./App.css";

const LayoutWithJustBar = () => {
  const navigate = useNavigate();
  const gradientStyle = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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
    <>
      <HeaderAppBar
        mainTopics={mainTopics}
      />
      <Outlet />
      {/* <TopicTabs
        mainTopics={mainTopics}
        currentMainTopic={currentMainTopic}
        setCurrentMainTopic={setCurrentMainTopic}
        onTabChange={handleTabChange}
      /> */}

      
      {/* <NewsGrid news={filteredNews} /> */}
      <TopSubTopics subTopics={subTopics} />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithHeader />}>
          {/* <Route index element={<MainPage />} /> */}
          <Route path="tab/:tabkey" element={<NewsGrid />} />
          <Route path="subtopics/:tagUid" element={<SubTopicNews />} />
        </Route>

        <Route path="/" element={<LayoutWithJustBar />}>    
          <Route path="news/:uid" element={<NewsDetail />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
