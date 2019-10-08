import * as express from 'express';
import bodyParser = require('body-parser');
import winston = require('winston');
import expressWinston = require('express-winston');
import { databaseSetup } from './config/database';
import { v1 } from './v1';

databaseSetup();

const app = express();

const port = 3000;


// request and error logging
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: (_req: any, _res: any) => { return false; } // optional: allows to skip some log messages based on request and/or response
}));


// extract the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());

app.get('/', (_req: any, res: any) => {
  res.send('Home');
});

app.use('/api/1', v1);

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

app.listen(port, () => {
  console.log('Server started on server ' + port);
});