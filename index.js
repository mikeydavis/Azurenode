const config = require('./server/config/config');
const app = require('./server/server');
const logger = require('./server/util/logger');

app.listen(config.PORT);

var maxtime = 1000;
var evenDoubler = function(v,callback){

}


var handleResults = function(err,results, time){
    if(err){
        logger.log('error' + err.message);
    }
    else
    {
        logger.log('results ' + results + 'and time ' + time + ' in ms ');
    }
}
logger.log('-------')

evenDoubler(2,handleResults);

logger.log('listening on Host: ' + config.PORT);
