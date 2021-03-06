require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Add a new todo
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send("Unable to save todo.", err);
  })
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({ todos })
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/12345
app.get('/todos/:id', authenticate, (req, res) => {
  var { id } = req.params

  if(!ObjectID.isValid(id)){
    return res.status(404).send("ID not valid.")
  }

  Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
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

  Todo.findOneAndRemove({
    _id: id,
    creator: req.user._id
  }).then((todo) => {
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
    .findOneAndUpdate({_id: id, user: req.user._id}, {$set: body}, {new: true})
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

/// User
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  console.log('LOGIN');
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      })
    })
    .catch((e) => {
      res.status(400).send();
    })
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send();
  })
});

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});

module.exports = {
  app
};
