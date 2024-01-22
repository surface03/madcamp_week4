// 1] large_tag에 따른 기사 쏴주기
// 2] 세부사항 tag에 따른 기사 쏴주기 (가능하면, 날짜 순서대로)

const express = require('express');
const session = require('express-session');
const db = require('./lib/db');
const cors = require('cors');

const router = express.Router();
const Filestore = require('session-file-store')(session);

router.use(cors());

// 세션 설정
router.use(session({
    secret: 'your-secret-key', // 세션 암호화를 위한 키, 실제 프로젝트에서는 보안에 신경쓰고 설정해야 합니다.
    resave: false,
    saveUninitialized: true,
    store: new Filestore()
  }));

  // 1] 특정 large_tag를 쏴주면, 그 large_tag를 가지는 기사들의 list or json파일을 쏴주는 data를 돌려주는 query
  router.get('/getLargeTag', async (req, res) => {
    const { large_tag } = req.query;
  
    if (!large_tag) {
      return res.status(400).json({ error: 'Large tag is required' });
    }
  
    try {
      const query = 'SELECT * FROM articles WHERE large_tag = ? ORDER BY article_date DESC';
      const [articles] = await db.execute(query, [large_tag]);
  
      res.json(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // 2] 특정 세부사항 tag를 쏴주면, 그 세부사항 tag를 가지는 기사들의 list or json파일을 쏴주는 data를 돌려주는 query
  router.get('/getDetailedTag', async (req, res) => {
    const { detail_tag } = req.query;
  
    if (!detail_tag) {
      return res.status(400).json({ error: 'Detail tag is required' });
    }
  
    try {
      const query = `
        SELECT a.* FROM articles a
        INNER JOIN article_tags at ON a.uid = at.article_uid
        WHERE at.tag = ? ORDER BY a.article_date DESC`;
  
      const [articles] = await db.execute(query, [detail_tag]);
  
      res.json(articles);
    } catch (error) {
      console.error('Error fetching articles by detailed tag:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  module.exports = router;
