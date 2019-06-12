var router = require('express').Router();
var verifyUser = require('./auth.js').verifyUser;
var controller = require('./controller');

// before we send back a jwt, lets check
// the password and username match what is in the DB

//verify user executed first then next controller.signin
//route specific middleware verifyUser()
//verifyUser() in auth.js before getting the token
router.post('/signin', verifyUser(), controller.signin);

module.exports = router;