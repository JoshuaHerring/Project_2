const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());

const port = process.env.port || 8080;

app.use("/", require("./routes"));


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});