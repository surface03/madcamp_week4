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
      let query;
      if (large_tag === 'all') {
        query = 'SELECT * FROM articles ORDER BY article_date DESC';
      } else {
        query = 'SELECT * FROM articles WHERE large_tag = ? ORDER BY article_date DESC';
      }
      const [articles] = await db.execute(query, large_tag === 'all' ? [] : [large_tag]);
      //console.log(articles); // Logging the articles
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

  // 2-2] unique_tags Table의 id를 쏴주면, 그 tag를 가지는 기사들의 list or json파일을 쏴주는 data를 돌려주는 query
  router.get('/getDetailedTagById', async (req, res) => {
    const { tag_id } = req.query;
  
    if (!tag_id) {
      return res.status(400).json({ error: 'Tag ID is required' });
    }
  
    try {
      const query = `
        SELECT a.* FROM articles a
        INNER JOIN article_tags at ON a.uid = at.article_uid
        INNER JOIN unique_tags ut ON at.tag = ut.tag
        WHERE ut.id = ? ORDER BY a.article_date ASC`;  // Changed DESC to ASC
  
      const [articles] = await db.execute(query, [tag_id]);
  
      res.json(articles);
    } catch (error) {
      console.error('Error fetching articles by tag ID:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  // 3] 기사의 uid를 보내면, 기사의 모든 정보를 보내주는 query
  router.get('/getAnArticle', async (req, res) => {
    const { uid } = req.query;
  
    if (!uid) {
      return res.status(400).json({ error: 'Article UID is required' });
    }
  
    try {
      const query = 'SELECT * FROM articles WHERE uid = ?';
      const [articles] = await db.execute(query, [uid]);
  
      if (articles.length === 0) {
        return res.status(404).json({ error: 'Article not found' });
      }
  
      res.json(articles[0]);
    } catch (error) {
      console.error('Error fetching article:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // 3-1] 기사의 uid를 보내면, 기사에 해당하는 모든 tag와 이에 따른 id (from unique_tags) 보내주기
  router.get('/getAllTagsOfArticle', async (req, res) => {
    const { uid } = req.query;
  
    if (!uid) {
      return res.status(400).json({ error: 'Article UID is required' });
    }
  
    try {
      const query = `
        SELECT ut.id, ut.tag FROM unique_tags ut
        INNER JOIN article_tags at ON ut.tag = at.tag
        WHERE at.article_uid = ?`;
  
      const [tags] = await db.execute(query, [uid]);
  
      if (tags.length === 0) {
        return res.status(404).json({ error: 'No tags found for this article' });
      }
  
      res.json(tags);
    } catch (error) {
      console.error('Error fetching tags for the article:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // 4] 최다 언급된 tag를 많이 포함하는 기사 12개를 보내주는 query
  router.get('/mostStatedArticle', async (req, res) => {
    try {
      // Step 1: Get the top 20 tags
      const topTagsQuery = `
        SELECT tag 
        FROM unique_tags 
        ORDER BY tag_count DESC 
        LIMIT 30`;
      const [topTags] = await db.execute(topTagsQuery);
      //console.log([topTags]);
    
      // Extract tags for use in the next query
      const tags = topTags.map(row => row.tag);
      //console.log(tags);

      // Step 2 and 3: Get 12 articles with the most overlapping tags
      const placeholders = tags.map(() => '?').join(', '); // Creates a string of placeholders
      const articlesQuery = `
        SELECT a.*, COUNT(*) as tag_overlap 
        FROM articles a
        INNER JOIN article_tags at ON a.uid = at.article_uid
        WHERE at.tag IN (${placeholders})
        GROUP BY a.uid
        ORDER BY tag_overlap DESC, a.article_date DESC
        LIMIT 12`;
      const [articles] = await db.execute(articlesQuery, tags);
      //console.log([articles]);
  
      res.json(articles);
    } catch (error) {
      console.error('Error fetching most stated articles:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // 5] 최다 언급된 tag 10개를 보내주는 query -- 성공
  router.get('/mostStatedTag', async(req, res) => {
    try {
      const topTagsQuery = `
      SELECT id, tag
      FROM unique_tags
      ORDER BY tag_count DESC
      LIMIT 10`;
      const [topTenTags] = await db.execute(topTagsQuery);
      res.json(topTenTags);
    } catch (error) {
      console.error('Error fetching most stated tags:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  module.exports = router;
