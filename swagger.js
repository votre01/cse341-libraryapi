const swaggerAutogen = require('swagger-autogen');

const doc = {
  info: {
    title: 'Library Api',
    description: 'Library Api'
  },
  host: 'https://cse341-libraryapi.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);