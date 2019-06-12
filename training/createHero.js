const Hero = require('./hero.model')

exports.createHeroAsync = async(req,res,next) => {
    try {
        //const hero = await Hero.fin
    }
    catch (e){
        return next(e)
    }
}