require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
  var { id } = req.params;

  if(!ObjectID.isValid(id)){
    return res.status(404).send("ID not valid.")
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo){
      return res.status(404).send("Todo not found.");
    }
    res.send({ todo })
  }, (err) => {
    res.status(400).send(e)
  });
});

app.patch('/todos/:id', (req, res) => {
  var { id } = req.params;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send("ID not valid.")
  }

  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo
    .findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    })
    .catch((e) => {
      res.status(400).send();
    })
});

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});

module.exports = {
  app
};
