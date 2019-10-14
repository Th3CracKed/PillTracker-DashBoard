import * as express from 'express';

import { userRouter } from './routes/user.router';
import { orderRouter } from './routes/order.router';

const app = express();

app.use('/user', userRouter);
app.use('/order', orderRouter);

export { app as v1 };
