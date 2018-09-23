const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {persons: null, error: null});
})


app.post('/', function (req, res) {
    let username = req.body.username;
    var options = {
      url: `https://api.github.com/users/${username}/followers`,
      headers: {
        'User-Agent': 'request'
      }
    };

  request(options, function (err, response, body) {
    if(err){
      res.render('index', {persons: null, error: 'Error, please try again'});
    } else {
      let persons = JSON.parse(body);
      if(persons.length == 0){
        res.render('index', {persons: null, error: 'Do not have followers '});
      } else {
        let personsText = persons;
        res.render('index', {persons: personsText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})