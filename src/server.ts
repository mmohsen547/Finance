import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './router/stock';
import stockRouter from './router/user';

const app : express.Application = express();

app.use(bodyParser.json());

app.listen(3000, async () => {
  console.log('Running on port 3000');
});

app.use('/api', userRouter);
app.use('/api', stockRouter);

export default app;
