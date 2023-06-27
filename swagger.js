const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Elden Ring API',
    description: 'Api of elden ring bosses and weapons'
  },
  host: 'project-2-zf2s.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-ouput.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
