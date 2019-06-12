const express = require('express'),
  app = express(),
  api = require('./api/api'),
  config = require('./config/config'),
  logger = require('./util/logger'),
  auth = require('./auth/routes'),
  mongoose = require('mongoose'),
  applyMiddleware = require('./middleware/applyMiddleware')
  
mongoose.connect(config.db.url,{
  useNewUrlParser: true,
  useCreateIndex: true
});

applyMiddleware(app)
app.use('/api/', api)
app.use('/auth', auth)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }
  logger.error(err.stack);
  res.status(500).send('Oops');
});

module.exports = app;
