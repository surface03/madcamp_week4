import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import { Tabs, Row, Col, Button } from 'antd';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NewsItem from './NewsItem';

import { exampleNewsList } from '../ExampleData';
import axios from '../../node_modules/axios/index';

const SubTopicNews = () => {
  const { tagUid } = useParams();
  const [newsItems, setNewsItems] = useState([]);
  console.log(tagUid);

  // 처음에 8개 아이템이 보이는데 수정가능
  const [displayCount, setDisplayCount] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async (tagUid) => {
      setLoading(true);
      try {
        // Correctly format the URL to include tagUid as a query parameter
        const response = await axios.get(`http://localhost:3000/news/getDetailedTagById?tag_id=${tagUid}`);
        const articles = response.data;
        setNewsItems(articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (tagUid) { // Only call loadNews if tagUid is available
      loadNews(tagUid);
    }
  }, [tagUid]); // Dependency array includes tagUid

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 6);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const displayedNews = newsItems.slice(0, displayCount);

  return (
    <>
      <Row gutter={[16, 16]}>
        {displayedNews.map((newsItem, index) => (
          <React.Fragment key={newsItem.uid}>
            <Col span={7}>
              <NewsItem newsItem={newsItem} />
            </Col>
            {index < displayedNews.length - 1 && (
              <Col
                span={1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowForwardIosIcon style={{ fontSize: '24px' }} />
              </Col>
            )}
          </React.Fragment>
        ))}
      </Row>
      {displayCount < newsItems.length && (
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col>
            <Button type="primary" onClick={handleShowMore}>
              Show More
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SubTopicNews;
