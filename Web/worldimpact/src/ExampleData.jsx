import React from "react";
import { BrowserRouter, Route, NavLink, Routes, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
  {
    id: "4",
    title: "뉴스 제목 4",
    date: "2024-01-05",
    mainTopic: "테크",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/421/2024/01/18/7298438.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "5",
    title: "뉴스 제목 5",
    date: "2024-01-06",
    mainTopic: "라이프",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254034.jpg?type=nf106_72",
    subTopics: ["2"],
  },
  {
    id: "6",
    title: "뉴스 제목 6",
    date: "2024-01-01",
    mainTopic: "한국",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2", "3"],
  },
  {
    id: "7",
    title: "뉴스 제목 7",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["4", "5"],
  },
  {
    id: "8",
    title: "뉴스 제목 8",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["6"],
  },
  {
    id: "9",
    title: "뉴스 제목 9",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["3", "5"],
  },
  {
    id: "10",
    title: "뉴스 제목 10",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["4"],
  },
  {
    id: "11",
    title: "뉴스 제목 11",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["5"],
  },
  {
    id: "12",
    title: "뉴스 제목 12",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2", "3", "4", "5"],
  },
  {
    id: "13",
    title: "뉴스 제목 13",
    date: "2024-01-11",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["3", "5"],
  },
  {
    id: "14",
    title: "뉴스 제목 14",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "15",
    title: "뉴스 제목 15",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "16",
    title: "뉴스 제목 16",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "17",
    title: "뉴스 제목 17",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "18",
    title: "뉴스 제목 18",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "19",
    title: "뉴스 제목 19",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "20",
    title: "뉴스 제목 20",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "21",
    title: "뉴스 제목 21",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
  {
    id: "22",
    title: "뉴스 제목 22",
    date: "2024-01-01",
    mainTopic: "정치",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/016/2024/01/18/2254142.jpg?type=nf106_72",
    subTopics: ["1", "2"],
  },
];


