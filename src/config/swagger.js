const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EDUmix API",
      version: "1.0.0",
      description: "EDUmix API documentation",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server",
      },
      {
        //  added your render URL for production testing
        url: "https://online-1-72ed.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  //  fixed path — your routers are in src/routers not routes
  apis: ["./src/routers/*.js"],
};

module.exports = swaggerJsdoc(options);