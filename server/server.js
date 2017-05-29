var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

// Add a new todo
app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send("Unable to save todo.", err);
  })
});

// Add a new user
app.post('/users', (req, res) => {

});

app.listen(3000, () => {
  console.log('Started at port 3000');
});
