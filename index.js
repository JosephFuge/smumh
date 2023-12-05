const express = require("express");
const app = express();
let path = require("path");
const PORT_NUM = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.RDS_HOSTNAME || "localhost",
    user: process.env.RDS_USERNAME || "postgres",
    password: process.env.RDS_PASSWORD || "postgres",
    database: process.env.RDS_DB_NAME || "intex",
    port: process.env.RDS_PORT || 5432,
    ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false
  }
});

app.get("/index", (req, res) => {
   res.render("index");
});

// Frontend static middleware
// app.use(express.static('public'));

// app.set("view engine", "ejs");
// app.set('views', './public');

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function getSurveyInfoList(pageNum) {
  const orgTypeSet = new Set(['University', 'Private', 'Government', 'Organization']);
  const platformSet = new Set(['Youtube', 'Instagram']);
  const testSurvey1 = new SurveyData(18, 'M', 'Single', 'University Student', orgTypeSet, true, platformSet, 'Between 1 and 2 hours', 2, 3, 1, 4, 3, 5, 2, 3, 5, 4, 2, 1);
  const testSurvey2 = new SurveyData();
  const testSurveys = [testSurvey1, testSurvey2];

  return testSurveys;
}

app.get('/responses', async (req, res) => {
  const pageNumber = req.body['pageNum'];
  const pageSize = req.body['pageSize'];

  res.render('public/admin/responses', {responses: getSurveyInfoList()});

  // if (Number.isNaN(pageNumber) || Number.isNaN(pageSize)) {
  //   res.status(400).json({message: 'Page number or page size is invalid'});
  // } else {
  //   knex.select().from("Response").then((response) => {
      
  //   });
  // }
});

// API listener middleware
// const apiRouter = express.Router();
// app.use(`/api`, apiRouter);

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));
