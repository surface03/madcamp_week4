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


export const exampleNewsList = [
  {
    uid: "naver_1008",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
  },
  {
    uid: "naver_1009",
    title_text: "네타냐후, 사우디와 관계정상화하라는 미국 제안 거부…커지는 미-이 갈등",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/028/2024/01/18/2673347.jpg?type=nf106_72",
  },
  {
    uid: "naver_1010",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
  },
  {
    uid: "naver_1011",
    title_text: "네타냐후, 사우디와 관계정상화하라는 미국 제안 거부…커지는 미-이 갈등",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/028/2024/01/18/2673347.jpg?type=nf106_72",
  },
  {
    uid: "naver_1012",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
  },
  {
    uid: "naver_1013",
    title_text: "네타냐후, 사우디와 관계정상화하라는 미국 제안 거부…커지는 미-이 갈등",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/028/2024/01/18/2673347.jpg?type=nf106_72",
  },
  {
    uid: "naver_1014",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
  },
  {
    uid: "naver_1015",
    title_text: "네타냐후, 사우디와 관계정상화하라는 미국 제안 거부…커지는 미-이 갈등",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/028/2024/01/18/2673347.jpg?type=nf106_72",
  },
  {
    uid: "naver_1016",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
  },
  {
    uid: "naver_1017",
    title_text: "네타냐후, 사우디와 관계정상화하라는 미국 제안 거부…커지는 미-이 갈등",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/028/2024/01/18/2673347.jpg?type=nf106_72",
  },
  {
    uid: "naver_1018",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
  },
  {
    uid: "naver_1019",
    title_text: "네타냐후, 사우디와 관계정상화하라는 미국 제안 거부…커지는 미-이 갈등",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/028/2024/01/18/2673347.jpg?type=nf106_72",
  },
  {
    uid: "naver_1020",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
  },
  {
    uid: "naver_1021",
    title_text: "네타냐후, 사우디와 관계정상화하라는 미국 제안 거부…커지는 미-이 갈등",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/028/2024/01/18/2673347.jpg?type=nf106_72",
  },
  {
    uid: "naver_1022",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
  },
  {
    uid: "naver_1023",
    title_text: "네타냐후, 사우디와 관계정상화하라는 미국 제안 거부…커지는 미-이 갈등",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/028/2024/01/18/2673347.jpg?type=nf106_72",
  },
  {
    uid: "naver_1024",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
  },
  {
    uid: "naver_1025",
    title_text: "네타냐후, 사우디와 관계정상화하라는 미국 제안 거부…커지는 미-이 갈등",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/028/2024/01/18/2673347.jpg?type=nf106_72",
  },
  {
    uid: "naver_1026",
    title_text: "GDP 등 통계 신뢰성에 의문…개도국 데이터 조작 심각",
    article_date: "2024-01-08",
    thumbnail: "https://mimgnews.pstatic.net/image/origin/001/2024/01/18/14452453.jpg?type=nf106_72",
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

// 최다 언급된 tag 10개를 반환
// export const fetchSubTopic = async() => {
//   try{
//     // Fetch the tag list for the most stated which contains 10
//     const response = await axios.get('http://localhost:3000/news/mostStatedTag');
//     const subTopiclist = response.data;
//     return subTopiclist;
//   } catch (error) {
//     console.error('Error fetching subTopic lists:', error);
//     return [];
//   }
// }