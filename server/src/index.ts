// server/index.ts
import express from 'express';
import cors from 'cors';
import router from './router';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});