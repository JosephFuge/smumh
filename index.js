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

app.set("view engine", "ejs");

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.use(express.urlencoded({extended: true}));

apiRouter.get('/fetchResponses', async (req, res) => {
  const pageNumber = req.body['pageNum'];
  const pageSize = req.body['pageSize'];

  if (Number.isNaN(pageNumber) || Number.isNaN(pageSize)) {
    res.status(400).json({message: 'Page number or page size is invalid'});
  } else {
    knex.select().from("Response").then((response) => {
      res.json(response);
  });
  }
});

// API listener middleware
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));
