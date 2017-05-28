const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('connected to MongoDB server');

  // db.collection('Todos').find({_id: new ObjectID('592b3ceb9a8afcd9ec5a0917')}).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unabke to fetch todos', err);
  // });

  db.collection('Todos').find().count().then((count) => {
    console.log('Todos count: ', count);
  }, (err) => {
    console.log('Unabke to fetch todos', err);
  });

  db.close();
});
