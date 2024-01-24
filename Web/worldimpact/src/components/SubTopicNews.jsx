import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import { Tabs, Row, Col, Button } from 'antd';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NewsItem from './NewsItem';

import { exampleNewsList } from '../ExampleData';

const SubTopicNews = () => {
  const { tagUid } = useParams();
  const [newsItems, setNewsItems] = useState([]);

  // 처음에 8개 아이템이 보이는데 수정가능
  const [displayCount, setDisplayCount] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const loadNews = async () => {
    //   setLoading(true);
    //   try {
    //     // 여기서 db에서 뉴스 리스트 받기, tagUid 사용
    //     //const fetchedNews = {} 이런식으로 초기화

    //     setNewsItems(fetchedNews);
    //   } catch (error) {
    //     console.error('Error fetching news:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // loadNews();

    // db 연동 성공하면 지워야 되는 코드
    console.log('RANDOM DEBUG MESSAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    setNewsItems(exampleNewsList);
    setLoading(false);
  }, [tagUid]);

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
