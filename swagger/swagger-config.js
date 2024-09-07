import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Invoice generation RESTFul API",
        version: "1.0.0",
        description: "API documentation for the Invoice generation backend",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          Product: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "Forex",
              },
              qty: {
                type: "number",
                example: 10,
              },
              rate: {
                type: "number",
                example: 99.99,
              },
            },
          },
          ProductArray: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
    },
    apis: ["./routes/*.js"],
  },
  swaggerSpec = swaggerJsdoc(options),
  setupSwagger = (app) => {
    app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger docs available at */api/api-docs");
  };

export default setupSwagger;
