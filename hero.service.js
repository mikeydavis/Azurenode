var HeroModel = require('./hero.model');
var mongo = require('./mongo');

mongo.connect();

function postHero(req,res){
  console.log(req.body.id);
  const originalHero = { id: req.body.id, name: req.body.name, saying:req.body.saying };

  const newHero = { name: req.body.name, saying: req.body.saying };
  //const originalHero = { id: 32, name: 'Black Panther', saying:'Wakanda forever' };
  //const hero = new HeroModel(originalHero);

  const hero = new HeroModel(newhero);

   //hero.save(function (err, hero) {
   //  if (err) return console.error(err);
   //  console.log("saved to hero collection.");
   //});

   hero.save()
    .then(hero => {
      res.status(200).json({'hero': 'hero added successfully'});
    })
    .catch(err => {
      res.status(400).send('unable to save to DB');
    });

}

function getHeroes(req, res) {
  //const heroes = HeroModel.find(c => c.id == parseInt(req.params.id));
  const docquery = HeroModel.find({});
  
  docquery
    .exec()
    .then(heroes => {
      res.status(200).json(heroes);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function checkServerError(res, error){
  if (error) {
    res.status(500).send(error);
    return error;
  }
}


module.exports = {
  getHeroes,
  postHero
};