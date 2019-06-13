const mongoose = require('mongoose');
/**
* Set to Node.js native promises
* Per http://mongoosejs.com/docs/promises.html
*/
mongoose.Promise = global.Promise;

const env = require('./env/environment');

// eslint-disable-next-line max-len
//const mongoUri = `mongodb://${env.accountName}:${env.key}@${env.accountName}.documents.azure.com:${env.port}/${env.databaseName}?ssl=true`;

const mongoUri = `mongodb://localhost:27017/Heroes`;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open',function(){
    console.log('connection ok');
});


function connect() {
    mongoose.set('debug', true);
    return mongoose.connect(mongoUri,{ useNewUrlParser: true });
}

module.exports = {
connect,
mongoose
};
