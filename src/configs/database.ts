import mongoose = require('mongoose');
import CONFIG from './config';

const connect = () => {
    mongoose
    .connect(CONFIG.DB_HOST).then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error('Database connection error' + err);
    });
};

export { connect as databaseSetup };