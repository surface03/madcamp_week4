import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import { Tabs, Row, Col, Button as AntButton} from 'antd';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NewsItem from './NewsItem';

import { exampleNewsList } from '../ExampleData';
import axios from '../../node_modules/axios/index';

// GPT 연동
import OpenAI from 'openai';
const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

const SubTopicNews = () => {
  const { tagUid } = useParams();
  const [newsItems, setNewsItems] = useState([]);
  console.log(tagUid);

  // 처음에 8개 아이템이 보이는데 수정가능
  const [displayCount, setDisplayCount] = useState(9);
  const [loading, setLoading] = useState(true);

  // GPT display
  const [summary, setSummary] = useState('');

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

  // GPT 연동
  const handleButtonClick = async () => {
    console.log('GPT 실행');
  
    // Limit the number of titles or shorten them
    let titles = newsItems.slice(0, 50).map(item => item.title_text).join('. ');
  
    // Construct the request payload
    const payload = {
      messages: [{ role: "system", content: titles + "\nThese are chronological order of article title of specific tag. Can you provide summary?\nPlease answer in Korean." }],
      model: "gpt-3.5-turbo",
    };
  
    // Send the request
    try {
      const completion = await openai.chat.completions.create(payload);
      setSummary(completion.choices[0].message.content);
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error with OpenAI:', error);
      setSummary("Sorry, there was an error processing your request.");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const displayedNews = newsItems.slice(0, displayCount);

  return (
    <>
      {/* Text field for the summary */}
      <AntButton onClick={handleButtonClick}>소주제 기사 요약</AntButton>
      <Row justify="center" style={{ marginBottom: '20px' }}>
      <Col span={24}>
        <div style={{ padding: '10px', border: '1px solid #d9d9d9', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto' }}>
          <h3>News Summary:</h3>
          <p>{summary || "Click 'Summarize' to generate a summary of the news titles."}</p>
        </div>
      </Col>
      </Row>


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
            <AntButton type="primary" onClick={handleShowMore}>
              Show More
            </AntButton>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SubTopicNews;
