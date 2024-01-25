import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";
import { Tabs, Row, Col, Button } from "antd";
import NewsItem from "./NewsItem";
import { exampleMainTopics } from "../ExampleData";
import { fetchNewsByLargeTag } from "../ExampleData";

const NewsGrid = () => {
  const [news, setNews] = useState([]);
  const { tabkey } = useParams();
  const [loading, setLoading] = useState(true);
  const [visibleNewsCount, setVisibleNewsCount] = useState(16);

  

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        console.log("값", tabkey);
        const topic = exampleMainTopics.find((topic) => topic.id === tabkey);

        if (topic && topic.name) {
          const largeTagNews = await fetchNewsByLargeTag(topic.name);
          setNews(largeTagNews);
          setLoading(false);
          console.log("topic name: ", topic.name);
        } else if (tabkey === "all") {
          const largeTagNews = await fetchNewsByLargeTag("all");
          setNews(largeTagNews);
          setLoading(false);
        } else {
          console.error("No topic found for the given key");
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    loadNews();
  }, [tabkey]);


  const loadMoreNews = () => {
    setVisibleNewsCount((prevCount) => prevCount + 16);
  };

  const filteredNews = news.slice(0, visibleNewsCount);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Row gutter={16}>
      {filteredNews.map((newsItem) => (
        <Col span={6} key={newsItem.id}>
          <NewsItem newsItem={newsItem} />
        </Col>
      ))}
    </Row>
    {visibleNewsCount < news.length && (
      <Button onClick={loadMoreNews}>더보기</Button>
    )}
    </>
  );
};

export default NewsGrid;