const express = require('express')
const bodyParser = require('body-parser');
const db = require('./lib/db');
// const paymentRoutes = require('./payment');
const userRoutes = require('./user');
const newsRoutes = require('./news');   //

const session = require('express-session');
const Filestore = require('session-file-store')(session);

const app = express()
const cors = require('cors')
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json()); 

// 세션 설정
app.use(session({
  secret: 'your-secret-key', // 세션 암호화를 위한 키, 실제 프로젝트에서는 보안에 신경쓰고 설정해야 합니다.
  resave: false,
  saveUninitialized: true,
  store: new Filestore()
}));

app.use(cors());

// app.use('/payment', paymentRoutes);
app.use('/user', userRoutes);
app.use('/news', newsRoutes);

// 라우팅
app.get('/', (req, res) => {
  res.send('Hello, VM World!!!!!');
});

app.get('/test', (req, res) => {
  res.send('test!!!!!!');
});
// 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
