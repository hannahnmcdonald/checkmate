import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CheckMate API',
            version: '1.0.0',
            description: 'API documentation for CheckMate',
        },
    },
    apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec