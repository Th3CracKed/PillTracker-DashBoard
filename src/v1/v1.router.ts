import * as express from 'express';

import { userRouter, orderRouter, productRouter, timelineRouter } from './routes';

const app = express();

app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/timeline', timelineRouter);

export { app as v1 };
