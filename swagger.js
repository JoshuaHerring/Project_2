const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Elden Ring API",
        description:"Api of elden ring bosses and weapons"
    },
    host: "localhost:8080",
    schemes: ['http'],
};

const outputFile = './swagger-ouput.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);