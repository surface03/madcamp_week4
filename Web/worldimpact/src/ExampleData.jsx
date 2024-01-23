import React from "react";
import { BrowserRouter, Route, NavLink, Routes, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import axios from "axios";

// 대주제 예시 데이터
export const exampleMainTopics = [
  { id: "1", name: "정치" },
  { id: "2", name: "경제" },
  { id: "3", name: "사회" },
  { id: "4", name: "문화" },
  { id: "5", name: "세계" },
  { id: "6", name: "노동" },
  { id: "7", name: "테크" },
  { id: "8", name: "라이프" },
];

// 소주제 예시 데이터
export const exampleSubTopics = [
  { id: "1", name: "국내정치" },
  { id: "2", name: "세계경제" },
  { id: "3", name: "코로나" },
  { id: "4", name: "전쟁" },
  { id: "5", name: "한국" },
  { id: "6", name: "석유" },
  { id: "7", name: "해양" },
  { id: "8", name: "AI" },
  { id: "9", name: "군대" },
  { id: "10", name: "게임" },
  { id: "11", name: "축구" },
];

// 뉴스 예시 데이터
export const exampleNews = [
  {
    id: "1",
    title: "뉴스 제목 1",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "2",
    title: "뉴스 제목 2",
    date: "2024-01-02",
    mainTopic: "경제",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/022/2024/01/18/3896013.jpg?type=nf106_72",
    subTopics: ["2"],
  },
  {
    id: "3",
    title: "뉴스 제목 3",
    date: "2024-01-08",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/011/2024/01/18/4288488.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
];

// large_tag에 따른 newslist 반환
export const fetchNewsByLargeTag = async (largeTag) => {
  try {
    // Fetch the news list for the given large tag from your server
    const response = await axios.get(`http://localhost:3000/news/getLargeTag?large_tag=${largeTag}`);

    // Assuming the response data is the list of articles
    const articles = response.data;

    return articles;

  } catch (error) {
    console.error('Error fetching news:', error);
    return []; // Return an empty array in case of an error
  }
}
