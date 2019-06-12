const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const env = require('./env/environment');

/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;
//const mongoUri = `mongodb://${env.accountName}:${env.key}@${env.accountName}.documents.azure.com:${env.port}/${env.databaseName}?ssl=true`;

const mongoUri = `mongodb://hub.midax.co.uk:27017/Heroes`;
// Retrieve
var MongoClient = require('mongodb').MongoClient;

function firstConnect() {
    console.log(mongoUri);

    // Connect to the db
    MongoClient.connect(mongoUri, function(err, db) {
      if(!err) {
        console.log("We are connected");
      }
    });

    const heroSchema = new Schema(
        {
          //id: { type: Number, required: true, unique: true },
          name: String,
          saying: String
        },
        {
          collection: 'HeroesDB'
        }
      );
    
    const Hero = mongoose.model('Hero', heroSchema);

    mongoose.set('debug', true);
    mongoose.connect(mongoUri,{ useNewUrlParser: true });

    const docquery = Hero.find({});

    docquery
        .exec()
        .then(heroes => {
            console.log(heroes)
            //res.status(200).json(heroes);
        })
        .catch(error => {
        res.status(500).send(error);
        return;
        });
}

function getHeroList() {
    
    const heroSchema = new Schema(
        {
          id: { type: Number, required: true, unique: true },
          name: String,
          saying: String
        },
        {
          collection: 'Heroes'
        }
      );
    
     const Hero = mongoose.model('Hero', heroSchema);

    mongoose.set('debug', true);
    mongoose.connect(mongoUri,{ useNewUrlParser: true });

    const docquery = Hero.find({});

    docquery
        .exec()
        .then(heroes => {
            console.log(heroes)
            //res.status(200).json(heroes);
        })
        .catch(error => {
        res.status(500).send(error);
        return;
        });
}
    

module.exports = {
  mongoose,
  getHeroList,
  firstConnect
};
