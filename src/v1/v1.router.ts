import * as express from 'express';

import { userRouter, orderRouter, productRouter } from './routes';

const app = express();

app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);

export { app as v1 };
