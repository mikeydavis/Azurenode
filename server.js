const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('./config');
const middleware = require('./middleware');
const mongodb = require("./mongoConnect")
const heroService = require('./hero.service');


// Starting point of the server
function main () {
  let app = express(); // Export app for other routes to use
  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));

  app.use(express.static('client'));
  app.use(bodyParser.json());
  // Routes & Handlers
  app.post('/login', handlers.login);
  app.get('/', middleware.checkToken, handlers.index);
  
  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Heroes1 = [
    { id: 1, name:'Spider man'},
    { id: 2, name:'Hulk'}
];


app.post('/api/posthero', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.id);
    console.log(req.body.saying);
    console.log('mon test');
    
    heroService.postHero(req,res);
    res.send({type:'POST'});
});

app.get('/api/dbheroes',(req,res) => {
    heroService.getHeroes(req,res);
});

app.post('/api/heroes', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    // Return result.
    const result = Joi.validate( req.body, schema);
    console.log(req.body);
    console.log(result);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
     const hero = {
        id: Heroes1.length + 1,
        name: req.body.name
    };

    Heroes1.push(hero);
    res.send(Heroes1);

});

app.get('/test',(req, res) => {
    
    mongodb.firstConnect();
    res.send("Hello Testing")

});

app.get('/api/heroes/:id', (req, res) => {
    const heroes = Heroes1.find(c => c.id == parseInt(req.params.id));
    if (!heroes) res.status(404).send('Not found');
    res.send(heroes);
});

app.get('/api/heroes', (req, res) => {
    const heroes = Heroes1;
    if (!heroes) res.status(404).send('Not found');
    res.send(heroes);
});

const port = process.env.PORT || 5000;
app.listen(5000,() => console.log(`Listening on ${port}... `))
  
  
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();





