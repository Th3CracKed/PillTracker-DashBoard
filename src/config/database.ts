import mongoose = require('mongoose');

const dbConfig = {
    database: 'mongodb://localhost:27017/meanAuth',
    secret: 'secretToken'
};

const connect = () => {
    mongoose
    .connect(dbConfig.database).then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error('Database connection error' + err);
    });
};

export { connect as databaseSetup };