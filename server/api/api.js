var router = require('express').Router();

router.use('/tweets',require('./tweet/tweetRoutes'));
router.use('/heroes',require('./hero/heroRoutes'));
router.use('/users',require('./user/userRoutes'));

module.exports = router;