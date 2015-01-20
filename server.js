// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://user:password@proximus.modulusmongo.net:27017/ujU3vuza');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());




var Meal = mongoose.model('Meal', {
  text : String,
  chef: String,
  votes: 0,

});

app.get('/api/meals', function(req, res) {

        // use mongoose to get all meals in the database
  Meal.find(function(err, meals) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err){
      res.send(err)
    }
    res.json(meals); // return all meals in JSON format
    });
  });

    // create todo and send back all meals after creation
  app.post('/api/meals', function(req, res) {
      // create a todo, information comes from AJAX request from Angular
    Meal.create({
      text : req.body.text,
      done : false
    }, function(err, meal) {
        if (err){
          res.send(err);
        }
        // get and return all the todos after you create another
        Meal.find(function(err, meals) {
            if (err){
              res.send(err)
            }
            res.json(meals);
        });
      });
  });

    // delete a todo
  app.delete('/api/meals/:meal_id', function(req, res) {
    Meal.remove({
      _id : req.params.meal_id
    }, function(err, meal) {
      if (err){
        res.send(err); 
      }
      // get and return all the todos after you create another
      Meal.find(function(err, meals) {
        if (err){
          res.send(err) 
        }
        res.json(meals);
      });
    });
  });


  app.get('*', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });






// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
