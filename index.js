const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-ouput.json');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.port || 8080;

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
