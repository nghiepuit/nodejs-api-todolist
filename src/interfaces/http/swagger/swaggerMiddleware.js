const SwaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const options = {
  swaggerOptions: {
    authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
  }
};

module.exports = [SwaggerUi.serve, SwaggerUi.setup(swaggerDocument, options)];
