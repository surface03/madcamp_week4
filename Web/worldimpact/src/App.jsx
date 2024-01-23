import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Routes, Link, Navigate, Outlet } from 'react-router-dom';
import { Tabs, Row, Col, Button } from 'antd';

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TopSubTopics from './components/TopSubTopics';
import SubTopicNews from './components/SubTopicNews';
import HeaderAppBar from './components/HeaderAppBar';
import NewsDetail from './components/NewsDetail';
import TopicTabs from './components/TopicTabs';
import NewsGrid from './components/NewsGrid';
import { exampleMainTopics, exampleSubTopics, exampleNews } from './ExampleData';

import './App.css';




const LayoutWithHeader = () => {
  const [mainTopics, setMainTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]);
  const [currentMainTopic, setCurrentMainTopic] = useState('all');
  const [news, setNews] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(16);

  useEffect(() => {
    setMainTopics(exampleMainTopics);
    setSubTopics(exampleSubTopics);
    setNews(exampleNews);
  }, []);

  const loadMoreNews = () => {
    setVisibleNewsCount(prevCount => prevCount + 16);
  };

  const filteredNews = currentMainTopic === 'all'
    ? news.slice(0, visibleNewsCount)
    : news.filter(n => n.mainTopic === currentMainTopic).slice(0, visibleNewsCount);

  return (
    <>
      <HeaderAppBar />
      <TopicTabs
        mainTopics={mainTopics}
        currentMainTopic={currentMainTopic}
        setCurrentMainTopic={setCurrentMainTopic}
      />
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
          <Route path="news/:newsId" element={<NewsDetail />} />
          <Route path="subtopics/:subTopicId" element={<SubTopicNews />} />

        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;