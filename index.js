const express = require("express");
const app = express();
const SurveyData = require("./shared/SurveyData.js");
let path = require("path");
const PORT_NUM = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.RDS_HOSTNAME || "awseb-e-h9iqh6mffe-stack-awsebrdsdatabase-dmmrvpxyf7gh.ciiiun5cmpps.us-east-1.rds.amazonaws.com",
    user: process.env.RDS_USERNAME || "ebroot",
    password: process.env.RDS_PASSWORD || "Section4Group9Admin!",
    database: "intex",
    port: process.env.RDS_PORT || 5432,
    ssl: true /*process.env.DB_SSL*/ ? {rejectUnauthorized: false} : false
  }
});

app.get("/index", (req, res) => {
   res.render("index");
});

// Frontend static middleware
app.use(express.static('public'));

app.use('/shared', express.static(path.join(__dirname, 'shared')));

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

app.get("/admin", (req, res) => {
  knex.select().from("response").then(surveyResponses => {
    res.render("responses", {responses: surveyResponses})
  })
})

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/survey", (req, res) => {
  res.render("survey");
})

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
})

app.get("/login", (req, res) => {
  res.render("login");
})

/*app.get('/responses', async (req, res, next) => {
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
});*/

// API listener middleware
// const apiRouter = express.Router();
// app.use(`/api`, apiRouter);

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));
