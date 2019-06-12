const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

const HeroModel = mongoose.model('Hero', heroSchema);

module.exports = HeroModel;