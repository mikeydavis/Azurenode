var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const heroSchema = new Schema(
    {
      name: String,
      saying: String
    },
    {
      collection: 'Heroes'
    }
  );
  
  const HeroModel = mongoose.model('Hero', heroSchema);

  module.exports = HeroModel;