import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { notFound, errorHandler } from './middlewares/errorHandler';
import apiRoutes from './routes/index.routes';

const app = express();


app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('LMS Insights backend API is running....');
});

app.use('/api/v1', apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
