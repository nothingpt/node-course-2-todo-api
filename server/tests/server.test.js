const request = require('supertest');
const expect = require('expect');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
//const { User } = require('./../models/user');

// clean the database before each test
beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe('POST /todos', function () {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err){
          done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(e => done(e))
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .expect(400)
      .end((err, res) => {
        if (err){
          done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch(e => done(e))
      });
  });
});
