var Hero = require('./heroModel');
var _ = require('lodash');

exports.params = function(req,res,next,id){
    Hero.findById(id)
    .then(function(hero){
        if (!hero) {
            next(new Error('No hero with that id'));
          } else {
            req.hero = hero;
            next();
          }
    }, function(err){
        next(err);
    });
};

exports.post = function post(req,res, next){
    
    console.log(req.body)
    const newHero = req.body;
    const hero = new Hero(newHero);
  
     hero.save()
      .then(hero => {
        res.status(201).json(hero);
        console.log('hero created');
      })
      .catch(err => {
        res.status(400).send('unable to save to DB');
        return;
      });

    res.status(201).send(hero);
  }


exports.getOne = function(req, res, next){
    var hero = req.hero;
    res.json(hero);
};

exports.get = function(req, res,next){

    Hero.find({})
        .then(function(heroes){
            res.json(heroes)
        },function(err){
            next(err); 
        });

};

exports.put = function(req,res,next){

    var hero = req.hero;
    const update = req.body;

    _.merge(hero,update);

    hero.save()
      .then(hero => {
        res.status(201).json(hero);
        console.log('hero updated');
      })
      .catch(err => {
        res.status(400).send('unable to update to DB');
        return;
      });

    res.status(201).send(hero);
};

exports.delete = function(req, res,next){

    const id = parseInt(req.params.id, 10);
    Hero.findOneAndRemove({ id: id })
        .then(hero => {
        if (!checkFound(res, hero)) return;
        res.status(200).json(hero);
        console.log('Hero deleted successfully!');
        })
        .catch(error => {
        if (checkServerError(res, error)) return;
        });

};

function checkFound(res, hero) {
    if (!hero) {
      res.status(404).send('Hero not found.');
      return;
    }
    return hero;
  }
