const express = require("express");
const app = express();
const PORT_NUM = 3000;
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "intex",
    port: 5432
  }
});

// Frontend static middleware
app.use(express.static('public'));

// API listener middleware
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));
