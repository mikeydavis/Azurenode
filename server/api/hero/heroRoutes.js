var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('../hero/heroController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(),auth.getFreshUser()];


//const createRoutes = require('../../util/createRoutes');
//createRoutes(controller,router);

router.param('id', controller.params);

router.route('/')
    .get(function(req,res,next){ 
        logger.log('get my hero'); 
        next();
    },controller.get)
    .post(checkUser,controller.post)

    // .get(function(req, res){
    //     logger.log('hi from heroes route');
    //     res.send({ok:true, message:'nice one spurs heroes'});
    // });

router.route('/:id')
    .get(controller.getOne)
    //.put(controller.put)
    //.delete(controller.delete)

router.route('/callbacks')


module.exports = router;