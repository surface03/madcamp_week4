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

import "./App.css";

const LayoutWithJustBar = () => {
  const gradientStyle = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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
  const [mainTopics, setMainTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]);
  const [currentMainTopic, setCurrentMainTopic] = useState("all");
  const [news, setNews] = useState([]);
  //const [filteredNews, setfilteredNews] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(16);

  useEffect(() => {
    const fetchInitialNews = async () => {
      try {
        const largeTagNews = await fetchNewsByLargeTag("all");
        setNews(largeTagNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    setMainTopics(exampleMainTopics);
    setSubTopics(exampleSubTopics);
    fetchInitialNews();
  }, []);

  useEffect(() => {
    setVisibleNewsCount(16);
    //setfilteredNews(news.slice(0, visibleNewsCount));
    console.log(news);
  }, [news]);

  const handleTabChange = async (key) => {
    try {
      console.log("값", key);
      const topic = exampleMainTopics.find((topic) => topic.id === key);

      if (topic && topic.name) {
        const largeTagNews = await fetchNewsByLargeTag(topic.name);
        setNews(largeTagNews);
        setCurrentMainTopic(topic.name); // Update the currentMainTopic state
        console.log("topic name: ", topic.name);
      } else if (key === "all") {
        const largeTagNews = await fetchNewsByLargeTag("all");
        setNews(largeTagNews);
        setCurrentMainTopic("전체");
      } else {
        console.error("No topic found for the given key");
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  const loadMoreNews = () => {
    setVisibleNewsCount((prevCount) => prevCount + 16);
  };

  const filteredNews = news.slice(0, visibleNewsCount);

  return (
    <>
      <HeaderAppBar
        mainTopics={mainTopics}
        currentMainTopic={currentMainTopic}
        setCurrentMainTopic={setCurrentMainTopic}
        onTabChange={handleTabChange}
      />
      {/* <TopicTabs
        mainTopics={mainTopics}
        currentMainTopic={currentMainTopic}
        setCurrentMainTopic={setCurrentMainTopic}
        onTabChange={handleTabChange}
      /> */}
      <NewsGrid news={filteredNews} />
      {visibleNewsCount < news.length && (
        <Button onClick={loadMoreNews}>더보기</Button>
      )}
      <TopSubTopics subTopics={subTopics} />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithHeader />}>
          {/* <Route index element={<MainPage />} /> */}
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
