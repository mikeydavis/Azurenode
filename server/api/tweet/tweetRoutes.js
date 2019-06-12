var router = require('express').Router();
var logger = require('../../util/logger');


router.route('/')
    .get(function(req, res){
        logger.log('hi from tweet route');
        res.send({ok:true, message:'nice one spurs'});
    })
    .post(function(req,res){
        console.log(req.body)
        res.send(req.body)
    })


module.exports = router;