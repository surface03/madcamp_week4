import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";

const NewsDetail = ({ match }) => {
  const newsId = match.params.newsId;
  // 뉴스 상세 페이지 로직
  // 예시 데이터에서 뉴스 찾기
  const newsItem = exampleNews.find((news) => news.id === newsId);

  return (
    <div>
      {newsItem ? (
        <div>
          <h1>{newsItem.title}</h1>
          <p>{newsItem.date}</p>
          {/* 기타 상세 정보 */}
        </div>
      ) : (
        <p>뉴스를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default NewsDetail;