var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

// Add a new todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send("Unable to save todo.", err);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos })
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/12345
app.get('/todos/:id', (req, res) => {
  var { id } = req.params

  if(!ObjectID.isValid(id)){
    return res.status(404).send("ID not valid.")
  }

  Todo.findById(id).then((todo) => {
    if (!todo){
      return res.status(404).send("Todo not found.");
    }
    res.send({ todo })
  }, (err) => {
    res.status(400).send(e)
  });
});

app.listen(3000, () => {
  console.log('Started at port 3000');
});

module.exports = {
  app
};
