const index = require('./index')
const user = require('./users')
const chat = require ('./chats')
const friend = require('./friends')
const message = require('./messages')
const request = require("supertest");
const express = require("express");
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", index);
app.use('/users', user)
app.use('/users/:id/friends', friend)
app.use('/users/:id/friends/:friend/chats', chat)
app.use('/users/:id/friends/:friend/chats/messages', message)
const agent = request.agent('http://localhost:3000');

let credentials = {  email: 'test@test.com',
password: 'test'
}

describe('index route works', () => {
    test("Responds with the user's information on login", async () => {
      await agent
        .post('/')
        .send((credentials))
        .expect(response => {
            expect(response.status).toBe(200)
            expect(response.body.data.email).toBe('test@test.com')
            expect(response.body.data.username).toBe('test')
        })});
  });
  
  describe('user route works', () => {
    test('create an account with an email that already exists', async () => {
        await agent
        .post('/users')
        .send({email: 'test@test.com', username: 'tests', password: 'test'})
        .expect( response => {
            expect(response.status).toBe(400)
            expect(response.body.errors[0].msg).toBe('Email already exists')        
        })
    })
    test('create an account with a username that already exists', async () => {
        await agent
        .post('/users')
        .send({email: 'tests@test.com', username: 'test', password: 'test'})
        .expect( response => {
            expect(response.status).toBe(400)
            expect(response.body.errors[0].msg).toBe('User already exists')
        })
    })

    let id;
    beforeEach( async () => {
        await agent
        .post('/')
        .send(credentials)
        .then( response => {
            id = response.body.data._id
        })
    })
    test('retrieve user data', async() => {
        await agent
            .get(`/users/${id}`)
            .expect( response => {
                expect(response.status).toBe(200)
                expect(response.body.user_detail.username).toBe('test')
        })
    })
  })
  