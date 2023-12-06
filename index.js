const express = require("express");
const app = express();
const SurveyData = require("./shared/SurveyData.js");
let path = require("path");
const PORT_NUM = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');


const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.RDS_HOSTNAME || "awseb-e-h9iqh6mffe-stack-awsebrdsdatabase-dmmrvpxyf7gh.ciiiun5cmpps.us-east-1.rds.amazonaws.com",
    user: process.env.RDS_USERNAME || "ebroot",
    password: process.env.RDS_PASSWORD || "Section4Group9Admin!",
    database: process.env.RDS_DB_NAME || "intex",
    port: process.env.RDS_PORT || 5432,
    ssl: true /*process.env.DB_SSL*/ ? {rejectUnauthorized: false} : false
  }
});

app.get("/index", (req, res) => {
   res.render("index");
});

// Frontend static middleware
app.use(express.static('public'));

app.use(express.json());

app.use('/shared', express.static(path.join(__dirname, 'shared')));

app.use('/admin', checkAuth);

app.set("view engine", "ejs");

// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

async function getSurveyInfoList(pageNum) {
  const orgTypeSet = new Set(['University', 'Private', 'Government', 'Organization']);
  const platformSet = new Set(['Youtube', 'Instagram']);
  const testSurvey1 = new SurveyData(18, 'M', 'Single', 'University Student', orgTypeSet, true, platformSet, 'Between 1 and 2 hours', 2, 3, 1, 4, 3, 5, 2, 3, 5, 4, 2, 1);
  const testSurvey2 = new SurveyData();
  const testSurveys = [testSurvey1, testSurvey2];

  const surveyResults = await knex.select().from("response");

  return surveyResults;
}

app.get('/responses', async (req, res, next) => {
  console.log(`Views directory: ${app.get('views')}`);
  console.log(`View engine: ${app.get('view engine')}`);

  const pageNumber = req.body['pageNum'];
  const pageSize = req.body['pageSize'];

  const surveyResponses = await getSurveyInfoList();

  res.render('responses', {responses: surveyResponses});

  if (Number.isNaN(pageNumber) || Number.isNaN(pageSize)) {
    res.status(400).json({message: 'Page number or page size is invalid'});
  } else {
    
  }
});

// API listener middleware
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.use(cookieParser());

async function checkAuth (req, res, next) {
  authToken = req.cookies['token'];
  const user = await getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
}

apiRouter.post('/login', async (req, res) => {
  const user = await getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.Password)) {
      setAuthCookie(res, user.AuthToken);
      res.send({ username: user.Username });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid username or password' });
});

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use('/api/auth', checkAuth);

async function getUserByToken(authToken) {
  const resultUser = await knex.select('Username').from('authorization').whereRaw('AuthToken = ?', [authToken]);
  return resultUser[0];
}

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

async function getUser(username) {
  const userResult = await knex.select('Username').from('authorization').whereRaw('Username = ?', [username]);
  return userResult[0];
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    Username: username,
    Password: passwordHash,
    AuthToken: uuid.v4(),
  };

  await knex.into('Authorization').insert(user);
  
  // return collection.insertOne(user);

  return user;
}

apiRouter.post('/auth/create', async (req, res) => {
  if (await getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.username, req.body.password);

    setAuthCookie(res, user.AuthToken);
    res.send({
      username: user.Username,
    });
  }
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie('token');
  res.status(204).end();
});

app.get('/user/me', async (req, res) => {
  const authToken = req.cookies['token'];
  const user = getUserByToken(authToken);
  if (user[0]) {
    res.send({ username: user[0].Username });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));
