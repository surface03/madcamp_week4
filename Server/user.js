// 추가해야 할 것
const express = require('express');
const session = require('express-session');
const db = require('./lib/db');
const cors = require('cors');

const router = express.Router();
const Filestore = require('session-file-store')(session);

// 아래 내용은 쓰지 말자... 
router.use(cors());
// router.use(cors({
//   origin: 'http://localhost:5174', // 클라이언트의 주소 - 다른 client 환경에서는 Axios error 발생시킬 수 있음
//   credentials: true,
// }));

// 세션 설정
router.use(session({
  secret: 'your-secret-key', // 세션 암호화를 위한 키, 실제 프로젝트에서는 보안에 신경쓰고 설정해야 합니다.
  resave: false,
  saveUninitialized: true,
  store: new Filestore()
}));

//기능1] 회원가입
router.post('/signup', async (req, res) => {
    
    try {
      // id(아이디)[PK], name(이름), age(나이), gender(성별), politicalOrientation(정치성향), password(비밀번호)
      const { id, name, age, gender, politicalOrientation, password} = req.body;

      console.log('데이터가 왔니?:', id, name, age, gender, politicalOrientation, password)

      // 아이디 중복 확인       --      table 정보 수정
      const [existingUser] = await db.execute('SELECT * FROM login.users WHERE id = ?', [id]);
      console.log('id 중복 확인 결과:', existingUser);

      if (existingUser.length > 0) {
        // 이미 존재하는 id인 경우
        res.status(409).json({ error: '이미 존재하는 id입니다.' });
      } else {
        // 사용자 정보 삽입
        await db.execute('INSERT INTO login.users (id, name, age, gender, politicalOrientation, password) VALUES (?, ?, ?, ?, ?, ?)',
        [id, name, age, gender, politicalOrientation, password]);
        console.log('사용자 정보 기입 완료');

        res.json({ message: '회원가입이 완료되었습니다.' });
      }
    } catch (error) {
      console.error('회원가입 중 에러:', error);
      res.status(500).json({ error: '서버 오류' });
    }
  });

//기능2] 로그인
router.get('/login', async (req, res) => {
  console.log('클라이언트에서 로그인 요청이 도착했습니다.');
  const { id, password } = req.query;
  try {
    // 입력된 이메일과 비밀번호가 일치하는 사용자 확인
    const [user] = await db.execute('SELECT * FROM login.users WHERE id = ? AND password = ?', [id, password]);

    if (user.length > 0) {
      // 로그인 성공
      // 세션에 user_id 저장    
      req.session.user = user[0];
      console.log('로그인 성공: ' + user[0].name);                // 확인 완료 - server
      res.json({ message: '로그인 성공', user: user[0].name });   // 확인 완료 - client
    } else {
      // 로그인 실패
      res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    console.error('로그인 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

//기능3] 로그아웃
router.post('/logout', async (req, res) => {
  try {
    // 현재 로그인된 사용자인지 확인
    if (req.session.user) {
      // 세션 파괴
      req.session.destroy((err) => {
        if (err) {
          console.error('로그아웃 중 에러:', err);
          res.status(500).json({ error: '서버 오류' });
        } else {
          res.json({ message: '로그아웃 성공' });
          // 로그아웃해서 session 삭제 완료되면 에러가 나지 않을 경우 main page로 redirect
          // res.redirect('/');
        }
      });
    } else {
      // 로그인되지 않은 사용자가 로그아웃 시도
      res.status(401).json({ error: '로그인 상태가 아닙니다.' });
      // res.redirect('/');
    }
  } catch (error) {
    console.error('로그아웃 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

//기능4] 로그인 된 상태: 기사 클릭시, 클릭한 기사에 따른  tagid에 따른 count 횟수 증가시키기 (post) ---- 성공!!!!
router.post('/logclick', async (req, res) => {
  console.log("Request Body: ", req.body); // Add this line
  const { user_id, article_uid } = req.body;
  
  console.log("Article uid", article_uid);
  console.log("User id", user_id);

  try {
    // Check if the article exists -- 문제없음
    const [articleExists] = await db.execute('SELECT uid FROM articles WHERE uid = ?', [article_uid]);
    if (articleExists.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    } 
    // Updated query with JOIN to fetch the tag ID (assuming it's represented by 'id' in 'unique_tags') -- 문제없음
    const [articleTags] = await db.execute(`
        SELECT ut.id AS tag_id
        FROM article_tags at
        JOIN unique_tags ut ON at.tag = ut.tag
        WHERE at.article_uid = ?
    `, [article_uid]);
    // Log the fetched tag IDs for verification
    console.log("Fetched article tag IDs:", articleTags.map(tag => tag.tag_id));
    // If no tags are associated with the article, handle accordingly
    if (articleTags.length === 0) {
      return res.status(404).json({ error: 'No tags found for this article' });
    }
    // Update user tag counts for each tag
    for (const tag of articleTags) {
      // Use tag.tag_id which is the correct identifier
      let tagId = tag.tag_id;  // Assuming tag_id is already an integer, no need for parseInt
      const [existingCount] = await db.execute('SELECT count FROM user_tag_counts WHERE user_id = ? AND tag_id = ?', [user_id, tagId]);
      if (existingCount.length > 0) {
        await db.execute('UPDATE user_tag_counts SET count = count + 1 WHERE user_id = ? AND tag_id = ?', [user_id, tagId]);
      } else {
        await db.execute('INSERT INTO user_tag_counts (user_id, tag_id, count) VALUES (?, ?, 1)', [user_id, tagId]);
      }
    }
        res.json({ message: 'Click logged successfully' });
      } catch (error) {
        console.error('Error logging click:', error);
        res.status(500).json({ error: 'Server Error' });
      }
    });

//기능5] 로그인 된 상태: user_id를 보내면, user가 클릭한 tagid에 따른 tag명과 count 횟수 쏴주기 (query)
router.get('/taglog', async (req, res) => {
  const { user_id } = req.query;
  try {
    // Query to join user_tag_counts with unique_tags to get tag name and count
    const [tagLogs] = await db.execute(`
      SELECT ut.tag, utc.count
      FROM user_tag_counts utc
      JOIN unique_tags ut ON utc.tag_id = ut.id
      WHERE utc.user_id = ?
    `, [user_id]);
    if (tagLogs.length === 0) {
      return res.status(404).json({ error: 'No tag logs found for this user' });
    }
    res.json(tagLogs);
  } catch (error) {
    console.error('Error fetching tag logs:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

//기능6] 로그인 된 상태: user_id를 보내면, user에 대한 정보를 모두 보내주기
router.get('/userInfo', async (req, res) => {
  const { id } = req.query;
  try {
    const[user] = await db.execute('SELECT * FROM login.users WHERE id = ?', [id]);

    if (user.length > 0) {
      console.log('회원정보 가져오기 성공: ' + user[0].name);
      res.json(user[0]);
    } else {
      res.status(401).json({ error: '일치하지 않습니다.' });
    }
  } catch (error) {
    console.error('정보가져오는데:', error);
    res.status(500).json({ error: '서버 오류' });
  }
}); 

module.exports = router;

  