const request = require('supertest');
const expect = require('expect');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');
//const { User } = require('./../models/user');

// clean the database before each test
// beforeEach((done) => {
//   Todo.remove({}).then(() => {
//     return Todo.insertMany(todos);
//   }).then(() => done());
// });

beforeEach(populateUsers);
beforeEach(populateTodos);

// describe('POST /todos', function () {
//   it('should create a new todo', (done) => {
//     var text = 'Test todo text';
//
//     request(app)
//       .post('/todos')
//       .send({ text })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text);
//       })
//       .end((err, res) => {
//         if (err){
//           return done(err);
//         }
//
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(1);
//           expect(todos[0].text).toBe(text);
//           done();
//         }).catch(e => done(e))
//       });
//   });
//
//   it('should not create todo with invalid body data', (done) => {
//     request(app)
//       .post('/todos')
//       .expect(400)
//       .end((err, res) => {
//         if (err){
//           return done(err);
//         }
//
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(0);
//           done();
//         }).catch(e => done(e))
//       });
//   });
// });
//
// describe('GET /todos', function () {
//   it('should get all todos', (done) => {
//     request(app)
//       .get('/todos')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   });
// });
//
// describe('GET /todos/:id', () => {
//   it('should return todo doc', (done) => {
//     request(app)
//       .get(`/todos/${todos[0]._id.toHexString()}`)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.todo.text).toBe(todos[0].text)
//       })
//       .end(done)
//   });
//
//   it('should return 404 if doc not found', (done) => {
//     var hexId = new ObjectID().toHexString();
//
//     request(app)
//       .get(`/todos/${hexId}`)
//       .expect(404)
//       .end(done);
//   });
//
//   it('should return 404 for non-object ids', (done) => {
//     request(app)
//       .get('/todos/123qwe')
//       .expect(404)
//       .end(done);
//   });
// });

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(users[0]._id.toHexString());
        expect (res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {

  });
});
