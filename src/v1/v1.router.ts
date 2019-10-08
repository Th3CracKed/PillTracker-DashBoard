import * as express from 'express';

import { userRouter } from './routes/user.router';

const app = express();

app.use('/user', userRouter);

export { app as v1 };
