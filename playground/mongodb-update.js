const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('connected to MongoDB server');

  // db.collection('Todos')
  //   .findOneAndUpdate(
  //     {
  //       _id: new ObjectID("592bcfd34f47b254f167cd7b")
  //     },
  //     {
  //       $set:
  //         {
  //           completed: true
  //         }
  //     },
  //     {
  //       returnOriginal: false
  //     })
  //   .then((result) => {
  //     console.log(result);
  //   }, (err) => {
  //     console.log('Could not update the document.', err);
  //   })
  //
  db.collection('Users')
    .findOneAndUpdate(
      {
        name: "Sandra"
      },
      {
        $set:
          {
            age: 36
          }
      },
      {
        returnOriginal: false
      })
    .then((result) => {
      console.log(result);
    }, (err) => {
      console.log('Could not update the document.', err);
    })

  //db.close();
});
