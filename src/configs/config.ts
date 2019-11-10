require('dotenv').config();

export const isEnvSetup = () => {
  if (!process.env.AUTH0_DOMAIN) {
    throw 'Make sure you have AUTH0_DOMAIN in your .env file';
  }
  if (!process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_AUDIENCE in your .env file';
  }
};

export default {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '3000',

  DB_DIALECT: process.env.DB_DIALECT || 'mongo',
  DB_HOST: process.env.DB_HOST || 'mongodb://localhost:27017/example_db',
  DB_NAME: process.env.DB_NAME || 'example_db',
  DB_PASSWORD: process.env.DB_PASSWORD || 'db-password',
  DB_PORT: process.env.DB_PORT || '27017',
  DB_USER: process.env.DB_USER || 'root',
  NAMESPACE: 'https://pillTracker/roles',
  SESSION_SECRET: process.env.SESSION_SECRET || 'LoxodontaElephasMammuthusPalaeoloxodonPrimelephas',
};
