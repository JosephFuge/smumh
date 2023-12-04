const express = require("express");
const app = express();

const PORT_NUM = 3000;

// Frontend static middleware
app.use(express.static('public'));

// API listener middleware
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));
