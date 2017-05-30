const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { user } = require('./../server/models/user');

// todo.remove({})
// Todo
//   .remove({})
//   .then((result) => {
//     console.log(result);
//   });

// Todo.findOneAndRemove
Todo
  .findOneAndRemove({_id: '592d628d4f47b254f167cd84'})
  .then((todo) => {

  });

// Todo.findByIdAndRemove
Todo
  .findByIdAndRemove('592d630d4f47b254f167cd85')
  .then((todo) => {
    console.log(todo);
  });
