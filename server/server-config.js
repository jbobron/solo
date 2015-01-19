var express = require('express');


var app = express();


app.get('/', function(req,res){
  res.render('')
  //handle error
  //render

});

app.post('/', function(req,res){
  // handle error
  Meal.findOne({mealName: mealName}).exec(function(err, found){
    var meal = new Meal({
      mealName: mealName,
      cook: name,
      base_url: req.headers.origin,
      likes:0
    });
    meal.save(function(err, newMeal){
      if(err){
        //send 500 err  res.send(500,err)
      }else{
        //send 200 with newMeal
      }
    })
  })
});


module.exports = app;