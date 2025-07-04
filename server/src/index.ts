import express from 'express';
import cors from 'cors';
import router from './router';
import cookieParser from 'cookie-parser';
import * as swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';


const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const port = process.env.PORT || 3001;

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Example API', version: '1.0.0' },
  },
  apis: ['./src/routes/*.ts'],
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
